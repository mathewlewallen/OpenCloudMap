import React from "react";
import ListOfMembers from "./ListOfMembers";
import { UITable, TableHeader, TableRow, TableHead } from "@/components/ui/table";

export default function MemberTable() {
	const tableHeader = ["Name", "Role", "Joined", "Status"];

	return (
		<UITable>
			<TableHeader>
				<TableRow>
					{tableHeader.map((header) => (
						<TableHead key={header}>{header}</TableHead>
					))}
				</TableRow>
			</TableHeader>
			<ListOfMembers />
		</UITable>
	);
}