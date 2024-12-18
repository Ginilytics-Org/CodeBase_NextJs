"use client";
import { GetFormById } from "@/actions/api";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
interface AmountList {
  value: string;
  selected: boolean;
}
const Page = () => {
  const pathname = usePathname();
  const pathParts = pathname.split("/");
  const formId = pathParts[2];
  useEffect(() => {
    GetFormById(formId).then((data) => {
      if (data && data.formData) {
        setTitle(data.formData.title);
        setBrandLogo(data.formData.brandLogo);
        setDescription(data.formData.description);
        if (data.formData.amountList?.length > 0) {
          setAmountList(
            data.formData.amountList.map((amount: string) => ({
              value: amount,
              selected: false,
            }))
          );
        }
        setVideoUrl(data.formData.videoUrl);
      }
    });
  }, []);


  const [title, setTitle] = useState("");
  const [brandLogo, setBrandLogo] = useState("");
  const [description, setDescription] = useState("");
  const [amountList, setAmountList] = useState<AmountList[]>(tempAmountList);
  const [otherAmount, setOtherAmount] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  return (
    <>
      <div className=" grid grid-flow-col">
        <div className="m-4">
          {brandLogo !== "" && (
            <header className="text-center mb-8">
              <img src={brandLogo} className="mx-auto mb-4 max-w-full h-auto" />
            </header>
          )}

          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="">
              <h2 className="text-3xl font-bold mb-4">{title}</h2>
              {videoUrl !== "" && (
                <div className="flex justify-center my-4">
                  <iframe
                    width="560"
                    height="250"
                    src={"https://www.youtube.com/embed/" + videoUrl}
                    title=".NET Conf 2024 - Day 1"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-lg shadow-lg"
                  ></iframe>
                </div>
              )}
              {description !== "" && (
                <span
                  className="mb-4 text-gray-600"
                  dangerouslySetInnerHTML={{
                    __html: `
                    <style>
                        h1 {
                          font-size: 2em;
                          font-weight: 700;
                        }

                        h2 {
                          font-size: 1.5em;
                          font-weight: 700;
                        }

                        h3 {
                          font-size: 1.17em;
                          font-weight: 700;
                        }

                        h4 {
                          font-size: 1em;
                          font-weight: 700;
                        }

                        h5 {
                          font-size: 0.83em;
                          font-weight: 700;
                        }

                        h6 {
                          font-size: 0.67em;
                          font-weight: 700;
                        }
                    </style>
                    ${description}
                `,
                  }}
                ></span>
              )}
            </div>
            <div className="">
              <h3 className="text-xl font-semibold mb-4">Choose an amount:</h3>
              <div className="grid grid-cols-4 gap-4 mb-4">
                {amountList.map((item, index) => (
                  <button
                    key={index}
                    className={
                      item.selected
                        ? "bg-gray-800 text-white font-bold py-2 rounded-lg border-2 border-gray-800 focus:outline-none"
                        : "border border-gray-300 p-2 rounded-lg hover:bg-gray-200"
                    }
                    onClick={() => {
                      setAmountList([
                        ...amountList.map((item, i) =>
                          i === index
                            ? { ...item, selected: true }
                            : { ...item, selected: false }
                        ),
                      ]);
                    }}
                  >
                    ${item.value}
                  </button>
                ))}
                <button className="border border-gray-300 p-2 rounded-lg bg-gray-200 flex">
                  <span className="mt-3 mr-1">$</span>
                  <input
                    type="text"
                    placeholder=""
                    className="border border-gray-300 p-2 rounded-lg w-[70px]"
                    value={otherAmount}
                    onChange={(e) => {
                      setOtherAmount(e.target.value);
                      setAmountList([
                        ...amountList.map((item, i) => {
                          return { ...item, selected: false };
                        }),
                      ]);
                    }}
                  />
                </button>
              </div>
              <h3 className="text-xl font-semibold mb-4">
                Enter Card Details:
              </h3>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Card Number"
                  className="border border-gray-300 p-2 px-8 rounded-lg w-full"
                  value={cardNumber}
                  onChange={(e) => {
                    setCardNumber(e.target.value);
                  }}
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="CVV"
                  className="border border-gray-300 p-2 px-8 rounded-lg w-full"
                  value={cardCvv}
                  onChange={(e) => {
                    setCardCvv(e.target.value);
                  }}
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Expiration Date"
                  className="border border-gray-300 p-2 px-8 rounded-lg w-full"
                  value={cardExpiry}
                  onChange={(e) => {
                    setCardExpiry(e.target.value);
                  }}
                />
              </div>
              <div className="grid grid-cols-1 gap-2">
                <button className="bg-blue-600 text-white p-3 rounded-lg flex items-center justify-center">
                  <span className="mr-2">💳</span> Pay with card
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Page;
