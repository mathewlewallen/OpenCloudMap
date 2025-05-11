import { Metadata } from "next"
import Link from 'next/link'

export const metadata: Metadata = {
  title: "Aviation Data",
  description: "Aviation data collection"
}

export default function DataPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">User Data</h1>
      <p className="mb-6">
        You can download our full user list in CSV format.
      </p>
      <Link
        href="/data/users.csv"
        download
        className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
      >
        Download users.csv
      </Link>
    </div>
  )
}