// src/graphql/graphqlUploadBaseQuery.ts

import { BaseQueryFn } from '@reduxjs/toolkit/query';
import { print } from 'graphql';
import { DocumentNode } from 'graphql';
import { Variables } from 'graphql-request';
import { RootState } from '@/app/store';
import { fetch as fetchPolyfill } from 'cross-fetch';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/graphql';

/**
 * Rekürsif olarak objede File var mı diye bakar.
 * Dosya birden fazla katmanda olabilir.
 */
function hasFile(obj: any): boolean {
  if (!obj || typeof obj !== 'object') return false;
  if (obj instanceof File) return true;
  if (Array.isArray(obj)) return obj.some((item) => hasFile(item));
  for (const key in obj) {
    if (hasFile(obj[key])) return true;
  }
  return false;
}

/**
 * Sadece fileMap oluşturur (dosyaların nerede olduğunu haritalar).
 * 'map' alanında dosya indexini hangi path'in temsil ettiğini belirtiriz.
 */
function createFileMap(
  obj: any,
  path: string,
  fileMap: Record<string, string[]>,
  fileIndex: { current: number }
) {
  if (!obj || typeof obj !== 'object') return;

  if (obj instanceof File) {
    fileMap[fileIndex.current] = [path];
    fileIndex.current++;
    return;
  }

  if (Array.isArray(obj)) {
    obj.forEach((item, index) => {
      createFileMap(item, `${path}.${index}`, fileMap, fileIndex);
    });
  } else {
    for (const key in obj) {
      createFileMap(obj[key], `${path}.${key}`, fileMap, fileIndex);
    }
  }
}

/**
 * Asıl dosyaları FormData'ya ekler (map'te belirtilen sıraya göre).
 * Bu alanlar, 'map' sonrasına gelmeli.
 */
function appendFiles(
  form: FormData,
  obj: any,
  path: string,
  fileIndex: { current: number }
) {
  if (!obj || typeof obj !== 'object') return;

  if (obj instanceof File) {
    // Dosyayı index'e göre ekle.
    form.append(String(fileIndex.current), obj);
    fileIndex.current++;
    return;
  }

  if (Array.isArray(obj)) {
    obj.forEach((item, index) => {
      appendFiles(form, item, `${path}.${index}`, fileIndex);
    });
  } else {
    for (const key in obj) {
      appendFiles(form, obj[key], `${path}.${key}`, fileIndex);
    }
  }
}

/**
 * RTK Query baseQuery fonksiyonu:
 *  - Dosya varsa multipart form-data
 *  - Dosya yoksa JSON body
 */
export const graphqlUploadBaseQuery: BaseQueryFn<
  { document: DocumentNode; variables?: Variables },
  unknown,
  unknown
> = async ({ document, variables }, api) => {
  const state = api.getState() as RootState;
  const token = state.user?.token;

  try {
    const headers: HeadersInit = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    let body: BodyInit;
    const includesFiles = hasFile(variables);

    if (includesFiles) {
      // 1) FormData oluştur
      const form = new FormData();

      // 2) 'operations' -> İçinde query + variables var
      form.append(
        'operations',
        JSON.stringify({
          query: print(document),
          variables,
        })
      );

      // 3) 'map'
      const fileMap: Record<string, string[]> = {};
      const fileIndex = { current: 0 };
      createFileMap(variables, 'variables', fileMap, fileIndex);
      form.append('map', JSON.stringify(fileMap));

      // 4) Dosyaları ekle (map'ten sonra gelmeli!)
      fileIndex.current = 0;
      appendFiles(form, variables, 'variables', fileIndex);

      body = form;
    } else {
      // Dosya yoksa normal JSON isteği
      headers['Content-Type'] = 'application/json';
      body = JSON.stringify({
        query: print(document),
        variables,
      });
    }

    // İstek at
    const response = await fetchPolyfill(API_URL, {
      method: 'POST',
      headers,
      body,
    });

    // Cevabı parse et
    const json = await response.json();
    if (json.errors) {
      return { error: json.errors };
    }
    return { data: json.data };
  } catch (error) {
    return { error };
  }
};
