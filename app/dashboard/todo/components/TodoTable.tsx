import React from "react";
import ListOfTodo from "./ListOfTodo";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/Table";

export default function TodoTable() {
	const tableHeader = ["Title", "Status", "Created at", "Created by"];

	return (
		<Table>
			<TableHeader>
				<TableRow>
					{tableHeader.map((header) => (
						<TableHead key={header}>{header}</TableHead>
					))}
				</TableRow>
			</TableHeader>
			<ListOfTodo />
		</Table>
	);
}