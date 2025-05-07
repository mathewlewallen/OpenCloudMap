import React from "react";
import ListOfMembers from "./ListOfMembers";
import { Table, TableHeader, TableRow, TableHead } from "@/components/ui/table";

export default function MemberTable() {
	const tableHeader = ["Name", "Role", "Joined", "Status"];

	return (
		<Table>
			<TableHeader>
				<TableRow>
					{tableHeader.map((header) => (
						<TableHead key={header}>{header}</TableHead>
					))}
				</TableRow>
			</TableHeader>
			<ListOfMembers />
		</Table>
	);
}