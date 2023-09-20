import Image from "next/image";
import logo from "images/tora.png";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="block">
      <Image
        src={logo}
        alt=""
        height={64} // 画像の高さ
        width={64} // 画像の幅
      />
    </Link>
  );
}
