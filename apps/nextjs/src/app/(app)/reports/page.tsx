import { Suspense } from "react";

import Loading from "~/app/loading";
import ReportList from "~/components/reports/report-list";
import NewReportModal from "~/components/reports/report-modal";
import { api } from "~/trpc/server";

export default function Reports() {
  const reports = api.report.byUser();

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="my-2 text-2xl font-semibold">Reports</h1>
        <NewReportModal />
      </div>
      <Suspense
        fallback={
          <div className="flex w-full flex-col gap-4">
            <Loading />
          </div>
        }
      >
        <ReportList reports={reports} />
      </Suspense>
    </main>
  );
}
