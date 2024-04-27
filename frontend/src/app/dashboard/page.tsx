import { Metadata } from "next";
import { currentUser } from "@/app/actions/user.actions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PasswordChange from "@/app/dashboard/PasswordChange";
import UpdateAccountDetails from "@/app/dashboard/UpdateAccount";
import AccountSettings from "@/app/dashboard/AccountSettings";
import ChangeProfilePicture from "@/app/dashboard/ChangeProfilePicture";
import UserInformation from "@/app/dashboard/UserInformation";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Manage Your Account - Dashboard",
  description: "Manage your account with ease",
};

const AccountPage = async () => {
  const { user } = await currentUser();
  return (
    <section className="md:container py-5">
      <h1 className="text-2xl capitalize md:text-4xl font-semibold text-center pt-4 pb-6 text-gray-500">
        Explore Your Dashboard
      </h1>

      <Tabs defaultValue="info" className="w-full md:max-w-3xl mx-auto">
        <TabsList>
          <TabsTrigger
            className="data-[state=active]:bg-pink-500 data-[state=active]:text-white"
            value="info"
          >
            User Info
          </TabsTrigger>
          <TabsTrigger
            className="data-[state=active]:bg-pink-500 data-[state=active]:text-white"
            value="account"
          >
            Account
          </TabsTrigger>
          <TabsTrigger
            className="data-[state=active]:bg-pink-500 data-[state=active]:text-white"
            value="password"
          >
            Change Password
          </TabsTrigger>
          <TabsTrigger
            className="data-[state=active]:bg-pink-500 data-[state=active]:text-white"
            value="settings"
          >
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="info">
          <div className="w-full mt-8">
            {/* Account Management Section */}
            <div className="flex flex-col gap-5 bg-white md:shadow-md md:border md:border-primary-dark rounded-lg md:p-6">
              <h2 className="text-2xl md:text-3xl text-primary-dark font-semibold mb-4 text-center">
                Account Information
              </h2>

              <div className="flex flex-col items-center gap-5 md:flex md:flex-row md:items-start md:justify-between p-5 md:p-0">
                {/* Change Profile Picture */}
                <ChangeProfilePicture />

                {/* divider */}
                <Separator
                  orientation="vertical"
                  className="h-screen bg-primary-dark w-1 mx-10 hidden md:block"
                />
                <Separator
                  orientation="horizontal"
                  className="w-full h-1 bg-primary-dark my-10 md:hidden"
                />

                {/* User Information */}
                <UserInformation user={user} />
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="account">
          <UpdateAccountDetails />
        </TabsContent>
        <TabsContent value="password">
          <PasswordChange />
        </TabsContent>
        <TabsContent value="settings">
          <AccountSettings />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default AccountPage;
