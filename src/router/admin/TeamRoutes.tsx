import { Route } from 'react-router-dom';
import TeamPage from '@/features/team/pages/TeamPage';
import TeamDetailPage from '@/features/team/pages/TeamDetailPage';
// İstersen ileride Create/Edit sayfaları da ekleyebilirsin

const TeamRoutes = () => {
    return (
        <>
            <Route path="teams" element={<TeamPage />} />
            <Route path="teams/:teamId" element={<TeamDetailPage />} />
            {/* Gelecekte: */}
            {/* <Route path="teams/create" element={<TeamCreatePage />} /> */}
            {/* <Route path="teams/edit/:teamId" element={<TeamEditPage />} /> */}
        </>
    );
};

export default TeamRoutes;
