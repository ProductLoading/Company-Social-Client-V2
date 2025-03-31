
import { useParams } from 'react-router-dom';
import { useGetTeamByIdQuery } from '../teamApi';
import TeamMembers from '../components/TeamMembers';

const TeamDetailPage = () => {
    const { teamId } = useParams<{ teamId: string }>();
    const { data: team, isLoading, error } = useGetTeamByIdQuery(teamId || '');

    if (isLoading) return <p>Yükleniyor...</p>;
    if (error || !team) return <p>Takım bulunamadı</p>;

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-2">{team.name}</h1>
            <p className="text-gray-700 mb-4">{team.description}</p>

            <p className="text-sm text-gray-500">
                Yöneticisi: {team.manager.firstName} {team.manager.lastName}
            </p>
            <p className="text-sm text-gray-500">
                Departman: {team.department.name} ({team.department.office.name})
            </p>

            <TeamMembers teamId={team.teamId} />
        </div>
    );
};

export default TeamDetailPage;
