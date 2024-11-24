import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import './CompanyEmployees.scss';
import { User } from '@utils/types';

interface CompanyEmployeesProps {
    employees: User[];
}

export default function CompanyEmployees({ employees }: CompanyEmployeesProps) {
    const [globalFilter, setGlobalFilter] = useState<string | null>(null);

    return (
        <div>
            <h2>Employees</h2>
            <div className="action-bar">
                <Button icon="pi pi-plus" label="New Employee" />
            </div>
            <DataTable
                value={employees}
                responsiveLayout="scroll"
                globalFilter={globalFilter}
                header={
                    <div className="table-header">
                        <InputText
                            type="search"
                            onInput={(e) => setGlobalFilter((e.target as HTMLInputElement).value)}
                            placeholder="Search..."
                        />
                    </div>
                }
            >
                <Column field="name" header="Name" sortable filter filterPlaceholder="Search by name"></Column>
                <Column field="team" header="Team" sortable filter filterPlaceholder="Search by team"></Column>
            </DataTable>
        </div>
    );
}
