import { faFaceGrinBeamSweat } from "@fortawesome/free-regular-svg-icons";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

function NotFound() {
  return (
    <div className="z-11 fixed-screen grid place-content-center bg-gray-800/30 backdrop-blur-[2px]">
      <div className=" flex flex-col items-center text-gray-600">
        <FontAwesomeIcon icon={faFaceGrinBeamSweat} className="text-5xl" />
        <span className="text-3xl font-bold">404</span>
        <span className="text-xl font-bold">Not Found</span>
        <Link href={"/"}>
          <button className="bg-c-green mt-4 rounded-full px-4 py-1 font-bold text-white">
            Go Home <FontAwesomeIcon icon={faArrowLeftLong} />
          </button>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
