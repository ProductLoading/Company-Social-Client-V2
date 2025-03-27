// 🧷 Post sabitleri (opsiyonel)
export const POST_TYPES = ['announcement', 'question', 'poll'];
export const POST_VISIBILITY_OPTIONS = [
    { label: 'Public', value: 'PUBLIC' },
    { label: 'Private', value: 'PRIVATE' },
    { label: 'Custom', value: 'CUSTOM' },
];
export interface PostVisibilityOption {
    label: string;
    value: 'PUBLIC' | 'PRIVATE' | 'CUSTOM';
}