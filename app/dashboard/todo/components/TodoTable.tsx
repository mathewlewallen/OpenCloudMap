import React from "react";
import ListOfTodo from "./ListOfTodo";
import { UITable, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function TodoTable() {
	const tableHeader = ["Title", "Status", "Created at", "Created by"];

	return (
		<UITable>
			<TableHeader>
				<TableRow>
					{tableHeader.map((header) => (
						<TableHead key={header}>{header}</TableHead>
					))}
				</TableRow>
			</TableHeader>
			<ListOfTodo />
		</UITable>
	);
}