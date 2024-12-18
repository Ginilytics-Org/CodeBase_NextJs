"use client";

import { GetFormById, UpdateFormById } from "@/actions/api";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
interface AmountList {
  value: string;
  selected: boolean;
}
/* const { v4: uuidv4 } = require('uuid');

const guid = uuidv4();
console.log(guid); */

const Page = () => {
  const router = useRouter();
  const pathname = usePathname();
  const pathParts = pathname.split("/");
  const formId = pathParts[2];
  const [data, setData] = useState<any>({});
  useEffect(() => {
    GetFormById(formId).then((data) => {
      if (data && data.formData) {
        setData(data);
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
  const tempAmountList = [
    { value: "25", selected: false },
    { value: "100", selected: false },
    { value: "250", selected: false },
    { value: "1,000", selected: false },
  ];
  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], // remove formatting button

    ["link", "image", "video"], // link and image, video
  ];
  const module1 = {
    toolbar: toolbarOptions,
  };
  const [title, setTitle] = useState("");
  const [brandLogo, setBrandLogo] = useState("");
  const [description, setDescription] = useState("");
  const [amountList, setAmountList] = useState<AmountList[]>(tempAmountList);
  const [otherAmount, setOtherAmount] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [selectedColumn, setSelectedColumn] = useState("");
  const brandFileRef = useRef<HTMLInputElement>(null);

  const handleBrandFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setBrandLogo(result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  return (
    <>
      <div className=" grid grid-flow-col">
        {isOpen && (
          <div className="border w-[300px] min-h-screen ">
            <div className="p-4  flex justify-between">
              <h2 className="text-3xl font-bold">Edit Form</h2>
              <button
                className=" bg-gray-800 text-white font-bold border p-2 border-gray-300  rounded-lg"
                onClick={() => {
                  UpdateFormById({
                    ...data,
                    formData: { title, brandLogo,description, amountList:amountList.map((amount) => amount.value), videoUrl },
                  }).then((data) => {
                    if (data) {
                      router.push("/");
                    }
                  });
                }}
              >
                Save
              </button>
              <button
                className=" bg-gray-800 text-white font-bold border p-2 border-gray-300  rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                Close
              </button>
            </div>
            <hr></hr>
            {selectedColumn !== "" && (
              <>
                <div className="mx-2 py-4">
                  <span
                    className="font-bold text-1xl text-blue-600 hover:cursor-pointer"
                    onClick={() => setSelectedColumn("")}
                  >
                    &lt;
                  </span>
                  <span className="font-bold ms-2">{selectedColumn}</span>
                </div>
                <hr></hr>
                {selectedColumn === "Title, ask, and URL" && (
                  <div className="m-2">
                    <div className="text-sm font-bold">Title</div>
                    <div>
                      <input
                        type="text"
                        placeholder="Enter a title"
                        className="border border-gray-300 p-2  rounded-lg w-full my-1"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                    <div className="text-sm font-bold">Donation ask</div>
                    <div>
                      <ReactQuill
                        theme="snow"
                        value={description}
                        onChange={setDescription}
                        modules={module1}
                      />
                    </div>
                    <div className="text-lg font-bold">Embedded Video</div>
                    <div className="text-sm mb-4">
                      Engage your donors with a video. Add one below to try it
                      out!
                    </div>
                    <div className="text-sm font-bold mt-1">Video URL</div>
                    <div>
                      <input
                        type="text"
                        placeholder="https://www.youtube.com/watch?v=12345678"
                        className="border border-gray-300 p-2  rounded-lg w-full my-1"
                        value={videoUrl!=''?"https://www.youtube.com/embed/" + videoUrl:""}
                        onChange={(e) => {
                          let value = e.target.value.split(
                            "https://www.youtube.com/watch?v="
                          );
                          if (value.length > 1) {
                            value[1] = value[1].split("&")[0];
                            setVideoUrl(value[1]);
                          } else {
                            setVideoUrl("");
                          }
                        }}
                      />
                    </div>
                    <div className="text-sm mb-4">
                      We currently support video URLs for Facebook videos and
                      YouTube videos, as well as video embed for Facebook
                      livestream.
                    </div>
                  </div>
                )}
                {selectedColumn === "Present donation amounts" && (
                  <div className="m-2">
                    <div className="text-sm font-bold">
                      Present donation amounts
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Separate options with commas"
                        className="border border-gray-300 p-2  rounded-lg w-full my-2"
                        onBlur={(e) => {
                          if (e.target.value.trim() === "") {
                            setAmountList(tempAmountList);
                          } else {
                            const values = e.target.value
                              .split(",")
                              .map((value) => ({
                                value: value.trim(),
                                selected: false,
                              }));
                            setAmountList(values);
                          }
                        }}
                      />
                    </div>
                    <div className="text-sm">
                      Please enter a maximum of seven values.
                    </div>
                    <div className="text-sm">
                      Contribution limits:
                      <ul className="list-disc ml-8">
                        <li>Tester Victory Fund: $500,000</li>
                      </ul>
                    </div>
                  </div>
                )}
                {selectedColumn === "Branding" && (
                  <>
                    <div className="border-dashed border-2 border-blue-200 rounded-md text-center py-4 m-4 items-center">
                      <p className="text-sm text-blue-600">
                        Only support .png .jpg ( add images ) files
                      </p>
                      <p className="text-sm text-blue-600 mb-1">
                        Upload images {/* or small video clips */}
                      </p>
                      {brandLogo === "" ? (
                        <button
                          className=" text-sm border border-gray-300 p-2 rounded-lg hover:bg-gray-200"
                          onClick={() => {
                            if (brandFileRef.current) {
                              brandFileRef.current.click();
                            }
                          }}
                        >
                          Upload
                        </button>
                      ) : (
                        <button
                          className=" text-sm border border-gray-300 p-2 rounded-lg hover:bg-gray-200"
                          onClick={() => {
                            if (brandFileRef.current)
                              brandFileRef.current.value = "";
                            setBrandLogo("");
                          }}
                        >
                          Clear
                        </button>
                      )}
                      <input
                        type="file"
                        onChange={handleBrandFileChange}
                        ref={brandFileRef}
                        className="hidden"
                        accept=".png, .jpg"
                      />
                    </div>
                  </>
                )}
              </>
            )}
            {selectedColumn === "" && (
              <div className="">
                <div
                  className="p-4 flex justify-between me-2 hover:cursor-pointer"
                  onClick={() => setSelectedColumn("Title, ask, and URL")}
                >
                  <span className="font-bold">Title, ask, and URL</span>
                  <span className="font-bold text-1xl text-blue-600">&gt;</span>
                </div>
                <hr></hr>
                <div
                  className="p-4 flex justify-between me-2 hover:cursor-pointer"
                  onClick={() => setSelectedColumn("Present donation amounts")}
                >
                  <span className="font-bold">Present donation amounts</span>
                  <span className="font-bold text-1xl text-blue-600">&gt;</span>
                </div>
                <hr></hr>
                <div
                  className="p-4 flex justify-between me-2 hover:cursor-pointer"
                  onClick={() => setSelectedColumn("Branding")}
                >
                  <span className="font-bold">Branding</span>
                  <span className="font-bold text-1xl text-blue-600">&gt;</span>
                </div>
                <hr></hr>
              </div>
            )}
          </div>
        )}
        <div className="mt-8 m-8">
          {!isOpen && (
            <button
              className="mx-3 bg-gray-800 text-white font-bold border p-2 border-gray-300  rounded-lg"
              onClick={() => setIsOpen(true)}
            >
              Edit Form
            </button>
          )}
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
                  dangerouslySetInnerHTML={{ __html: `
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
                ` }}
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
