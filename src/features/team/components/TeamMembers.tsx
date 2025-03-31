
import { useGetUsersForTeamQuery } from '../teamApi';

interface Props {
    teamId: string;
}

const TeamMembers = ({ teamId }: Props) => {
    const { data: users, isLoading, error } = useGetUsersForTeamQuery(teamId);

    if (isLoading) return <p>Yükleniyor...</p>;
    if (error) return <p>Hata oluştu</p>;

    return (
        <div className="mt-4">
            <h4 className="font-bold mb-2">Takım Üyeleri</h4>
            <ul className="list-disc ml-5 space-y-1">
                {users?.map((item) => (
                    <li key={item.id}>
                        {item.user.firstName} {item.user.lastName} ({item.user.email})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TeamMembers;
