"use client";
import Image from "next/image";
import { SVGProps, useState } from "react";
import { Dialog } from "@headlessui/react";
import { signOut } from "next-auth/react";
import { GoogleUser } from "@/types/entities/user";

interface UserIconProps {
  user?: GoogleUser | null;
}

const UserIcon = ({ user }: UserIconProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        className="w-10 h-10 glass rounded-full m-4 cursor-pointer hover:opacity-80 transition-opacity"
        onClick={() => setIsModalOpen(true)}
      >
        {user?.thumbnail
          ? (
            <Image
              src={user.thumbnail}
              alt="User Icon"
              width={96}
              height={96}
              className="rounded-full border-glass"
            />
          )
          : <IcBaselinePerson width={40} height={40} />}
      </div>

      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="glass rounded-xl p-6 max-w-sm w-full shadow-xl">
            <Dialog.Title className="text-xl font-medium mb-4">
              アカウント管理
            </Dialog.Title>

            {user
              ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    {user.thumbnail && (
                      <Image
                        src={user.thumbnail}
                        alt="User Icon"
                        width={60}
                        height={60}
                        className="rounded-full"
                      />
                    )}
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-gray-500 text-sm">{user.email}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <button
                      onClick={() => {
                        signOut();
                        setIsModalOpen(false);
                      }}
                      className="w-full py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      サインアウト
                    </button>
                  </div>
                </div>
              )
              : <p>ログインしていません</p>}
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

const IcBaselinePerson = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4m0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4"
      >
      </path>
    </svg>
  );
};

export default UserIcon;
