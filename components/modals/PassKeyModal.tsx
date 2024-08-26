"use client";
import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { decryptKey, encryptKey } from "@/lib/utils";

const PassKeyModal = () => {
  const [open, setOpen] = useState(true);
  const [passKey, setPassKey] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const path = usePathname();
  const encryptedKey =
    typeof window !== "undefined"
      ? window.localStorage.getItem("accessKey")
      : null;

  useEffect(() => {
    const accessKey = encryptedKey && decryptKey(encryptedKey);
    if (path) {
      if (accessKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
        setOpen(false);
        router.push("/admin");
        setError("");
      } else {
        setOpen(true);
      }
    }
  }, [encryptedKey]);

  const closeModal = () => {
    setOpen(false);
    router.push("/");
  };

  console.log(path + 'Hello')

  const validatePasskey = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (passKey.length !== 6) {
      setError("Please fill in your passkey");
      return;
    }
    if (passKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
      const encryptedKey = encryptKey(passKey);
      localStorage.setItem("accessKey", encryptedKey);
      setOpen(false);
      router.push("/");

      setError("");
    } else {
      setError("Invalid passkey. Please try again");
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="shad-alert-dialog">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-start justify-between">
            Access Verification
            <Image
              src={"/assets/icons/close.svg"}
              alt="close"
              height={20}
              width={20}
              onClick={closeModal}
              className="cursor-pointer"
            />
          </AlertDialogTitle>
          <AlertDialogDescription className="text-[#ABB8C4]">
            To access the admin page, please enter the 123456
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div>
          <InputOTP
            maxLength={6}
            value={passKey}
            onChange={(value) => setPassKey(value)}
          >
            <InputOTPGroup className="shad-otp">
              <InputOTPSlot
                className="shad-otp-slot !border-[#24AE7C] !border-2 !text-[#24AE7C]"
                index={0}
              />
              <InputOTPSlot
                className="shad-otp-slot !border-[#24AE7C] !border-2 !text-[#24AE7C]"
                index={1}
              />
              <InputOTPSlot
                className="shad-otp-slot !border-[#24AE7C] !border-2 !text-[#24AE7C] bg-[#1A1D21]
                relative before:absolute
                before:w-full
                before:h-full
                before:-z-10
                before:bg-gradient-to-r
                before:from-[#82DBF7]
                before:to-[#B6F09C]
                before:left-0
                before:top-0
                before:blur-[3.5px]"
                index={2}
              />
              <InputOTPSlot className="shad-otp-slot" index={3} />
              <InputOTPSlot className="shad-otp-slot" index={4} />
              <InputOTPSlot className="shad-otp-slot" index={5} />
            </InputOTPGroup>
          </InputOTP>
          {error && (
            <p className="shad-error text-14-regular mt-4 flex justify-center">
              {error}
            </p>
          )}
        </div>
        <AlertDialogFooter>
          <AlertDialogAction
            className="w-full shad-primary-btn"
            onClick={(e) => validatePasskey(e)}
          >
            Enter Admin Passkey
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PassKeyModal;
