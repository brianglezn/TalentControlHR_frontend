import { InputText } from 'primereact/inputtext';
import { ColorPicker } from 'primereact/colorpicker';
import { Button } from 'primereact/button';
import { CompanyTeam } from '@utils/types';

interface CompanyTeamsProps {
    teams: CompanyTeam[];
    setTeams: (teams: CompanyTeam[]) => void;
}

export default function CompanyTeams({ teams, setTeams }: CompanyTeamsProps) {
    const handleAddTeam = () =>
        setTeams([
            ...teams,
            {
                teamId: `new-team-${Date.now()}`,
                name: '',
                description: '',
                color: '#000000',
                users: [],
            },
        ]);

    return (
        <div>
            <h2>Teams</h2>
            <div className="action-bar">
                <Button icon="pi pi-plus" label="New Team" onClick={handleAddTeam} />
            </div>
            {teams.map((team, index) => (
                <div className="team-row" key={team.teamId}>
                    <div>
                        <label>Team Name</label>
                        <InputText
                            value={team.name}
                            onChange={(e) => {
                                const updatedTeams = [...teams];
                                updatedTeams[index].name = e.target.value;
                                setTeams(updatedTeams);
                            }}
                        />
                    </div>
                    <div>
                        <label>Description</label>
                        <InputText
                            value={team.description}
                            onChange={(e) => {
                                const updatedTeams = [...teams];
                                updatedTeams[index].description = e.target.value;
                                setTeams(updatedTeams);
                            }}
                        />
                    </div>
                    <div>
                        <label>Color</label>
                        <ColorPicker
                            value={team.color}
                            onChange={(e) => {
                                const updatedTeams = [...teams];
                                updatedTeams[index].color = e.value as string;
                                setTeams(updatedTeams);
                            }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}
