import { GetFormList } from "@/actions/api";
import { DataTable } from "@/components/data-table";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { ColumnDef } from "@tanstack/react-table";


const Page = async() => {
  const data=await GetFormList();
  return (
    <div className="grid min-h-screen w-full ">
      <div className="flex flex-col sm:gap-4 sm: pe-4 sm:pl-14">
        <main className="grid items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className=" flex-col md:flex">
            <div className="border-b">
              <div className="flex py-5 items-center px-4">
                <div className="ml-auto flex items-center space-x-4">
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center">
                      <div className="md:hidden block">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5 me-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                          />
                        </svg>
                      </div>
                      <h2 className="text-3xl font-bold tracking-tight">
                        Form List
                      </h2>
                    </div>
                    <div className="w-full"></div>
                  </div>
                </div>
                <div className="ml-auto flex items-center space-x-4"></div>
              </div>
            </div>
          </div>
          <Tabs defaultValue="all">
            <TabsContent value="all">
              <Card x-chunk="dashboard-06-chunk-1">
                <CardHeader>
                  <CardTitle>
                    <div className="md:flex items-center">
                      <span>Form List</span>
                      <div className="md:mt-0 ml-auto flex items-center gap-2">
                        <span className=" md:flex items-center gap-1">
                          {/* <AddCompany /> */}
                        </span>
                      </div>
                    </div>
                  </CardTitle>
                  <CardDescription>
                    Manage your forms
                  </CardDescription>
                </CardHeader>
                <CardContent className="mb-12">
                  <DataTable data={data} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};
export default Page;
