import { Metadata } from "next";
import { currentUser } from "@/app/actions/user.actions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PasswordChange from "@/app/(protected)/dashboard/PasswordChange";
import UpdateAccountDetails from "@/app/(protected)/dashboard/UpdateAccount";
import AccountSettings from "@/app/(protected)/dashboard/AccountSettings";
import ChangeProfilePicture from "@/app/(protected)/dashboard/ChangeProfilePicture";
import UserInformation from "@/app/(protected)/dashboard/UserInformation";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Manage Your Account - Dashboard",
  description: "Manage your account with ease",
};

const AccountPage = async () => {
  const { user } = await currentUser();
  return (
    <section className="container mt-20 py-5">
      <h1 className="text-3xl font-semibold text-center py-4 text-pink-500">
        Manage Your Account
      </h1>

      <Tabs defaultValue="info" className="w-full max-w-3xl mx-auto">
        <TabsList>
          <TabsTrigger value="info">User Info</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Change Password</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="info">
          <div className="w-full mt-8">
            {/* Account Management Section */}
            <div className="flex flex-col gap-5 bg-white shadow-md border border-primary-dark rounded-lg p-6">
              <h2 className="text-2xl md:text-3xl text-primary-dark font-semibold mb-4 text-center">
                Account Information
              </h2>

              <div className="flex flex-col items-center gap-5 md:flex md:flex-row md:items-start md:justify-between">
                {/* Change Profile Picture */}
                <ChangeProfilePicture />

                {/* divider */}
                <Separator
                  orientation="vertical"
                  className="h-screen bg-primary-dark w-1 mx-10 hidden md:block"
                />
                <Separator
                  orientation="horizontal"
                  className="w-screen h-1 bg-primary-dark my-10 md:hidden"
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
