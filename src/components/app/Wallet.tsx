import { faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Wallet({ name = "Tiền mặt" }: { name: string }) {
  return (
    <div className="flex items-center">
      <FontAwesomeIcon
        icon={faWallet}
        className="rounded-full bg-slate-500/50 p-1 text-orange-400/90"
      />
      <span className="px-2 text-sm font-bold">{name}</span>
    </div>
  );
}

export default Wallet;
