import ReportList from "~/components/reports/report-list";
import NewReportModal from "~/components/reports/report-modal";
import { api } from "~/trpc/server";

export default async function Reports() {
  const reports = await api.report.byUser();

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="my-2 text-2xl font-semibold">Reports</h1>
        <NewReportModal />
      </div>
      <ReportList reports={reports} />
    </main>
  );
}
