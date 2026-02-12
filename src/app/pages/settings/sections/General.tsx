// Import Dependencies
import { PhoneIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { EnvelopeIcon, UserIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { HiPencil } from "react-icons/hi";

// Local Imports
import { PreviewImg } from "@/components/shared/PreviewImg";
import { Avatar, Button, Input, Upload } from "@/components/ui";

// ----------------------------------------------------------------------

export default function General() {
  const [avatar, setAvatar] = useState<File | null>(null);

  return (
    <div className="w-full max-w-3xl 2xl:max-w-5xl">
      <h5 className="dark:text-dark-50 text-lg font-medium text-gray-800">
        General
      </h5>
      <p className="dark:text-dark-200 mt-0.5 text-sm text-balance text-gray-500">
        Update your account settings.
      </p>
      <div className="dark:bg-dark-500 my-5 h-px bg-gray-200" />
      <div className="mt-4 flex flex-col space-y-1.5">
        <span className="dark:text-dark-100 text-base font-medium text-gray-800">
          Avatar
        </span>
        <Avatar
          size={20}
          imgComponent={PreviewImg}
          imgProps={{ file: avatar } as any}
          src="/images/avatar/avatar-20.jpg"
          classNames={{
            root: "ring-primary-600 dark:ring-primary-500 dark:ring-offset-dark-700 rounded-xl ring-offset-[3px] ring-offset-white transition-all hover:ring-3",
            display: "rounded-xl",
          }}
          indicator={
            <div className="dark:bg-dark-700 absolute right-0 bottom-0 -m-1 flex items-center justify-center rounded-full bg-white">
              {avatar ? (
                <Button
                  onClick={() => setAvatar(null)}
                  isIcon
                  className="size-6 rounded-full"
                >
                  <XMarkIcon className="size-4" />
                </Button>
              ) : (
                <Upload
                  name="avatar"
                  onChange={(files) => setAvatar(files[0])}
                  accept="image/*"
                >
                  {({ ...props }) => (
                    <Button isIcon className="size-6 rounded-full" {...props}>
                      <HiPencil className="size-3.5" />
                    </Button>
                  )}
                </Upload>
              )}
            </div>
          }
        />
      </div>
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 [&_.prefix]:pointer-events-none">
        <Input
          placeholder="Enter Nickname"
          label="Display name"
          className="rounded-xl"
          prefix={<UserIcon className="size-4.5" />}
        />
        <Input
          placeholder="Enter FullName"
          label="Full name"
          className="rounded-xl"
          prefix={<UserIcon className="size-4.5" />}
        />
        <Input
          placeholder="Enter Email"
          label="Email"
          className="rounded-xl"
          prefix={<EnvelopeIcon className="size-4.5" />}
        />
        <Input
          placeholder="Phone Number"
          label="Phone Number"
          className="rounded-xl"
          prefix={<PhoneIcon className="size-4.5" />}
        />
      </div>
      <div className="dark:bg-dark-500 my-7 h-px bg-gray-200" />
      <div>
        <div>
          <p className="dark:text-dark-100 text-base font-medium text-gray-800">
            Linked Accounts
          </p>
          <p className="mt-0.5">
            Manage your linked accounts and their permissions.
          </p>
        </div>
        <div>
          <div className="mt-4 flex items-center justify-between space-x-2">
            <div className="flex min-w-0 items-center space-x-4">
              <div className="size-12">
                <img
                  className="h-full w-full"
                  src="/images/logos/google.svg"
                  alt="logo"
                />
              </div>
              <p className="truncate font-medium">Sign In with Google</p>
            </div>
            <Button
              className="text-xs-plus h-8 rounded-full px-3"
              variant="outlined"
            >
              Connect
            </Button>
          </div>
          <div className="mt-4 flex items-center justify-between space-x-2">
            <div className="flex min-w-0 items-center space-x-4">
              <div className="size-12">
                <img
                  className="h-full w-full"
                  src="/images/logos/github-round.svg"
                  alt="logo"
                />
              </div>
              <p className="truncate font-medium">Sign In with Github</p>
            </div>
            <Button
              className="text-xs-plus h-8 rounded-full px-3"
              variant="outlined"
            >
              Connect
            </Button>
          </div>
          <div className="mt-4 flex items-center justify-between space-x-2">
            <div className="flex min-w-0 items-center space-x-4">
              <div className="size-12">
                <img
                  className="h-full w-full"
                  src="/images/logos/instagram-round.svg"
                  alt="logo"
                />
              </div>
              <p className="truncate font-medium">Sign In with Instagram</p>
            </div>
            <Button
              className="text-xs-plus h-8 rounded-full px-3"
              variant="outlined"
            >
              Connect
            </Button>
          </div>
          <div className="mt-4 flex items-center justify-between space-x-2">
            <div className="flex min-w-0 items-center space-x-4">
              <div className="size-12">
                <img
                  className="h-full w-full"
                  src="/images/logos/discord-round.svg"
                  alt="logo"
                />
              </div>
              <p className="truncate font-medium">Sign In with Discord</p>
            </div>
            <Button
              className="text-xs-plus h-8 rounded-full px-3"
              variant="outlined"
            >
              {" "}
              Connect
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-8 flex justify-end space-x-3">
        <Button className="min-w-[7rem]">Cancel</Button>
        <Button className="min-w-[7rem]" color="primary">
          Save
        </Button>
      </div>
    </div>
  );
}
