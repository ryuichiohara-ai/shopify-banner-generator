"use client";

import { forwardRef } from "react";
import type { BannerData, TemplateId } from "@/lib/types";
import MobileSimple from "./templates/simple/MobileSimple";
import MobileSale from "./templates/sale/MobileSale";
import MobileGift from "./templates/gift/MobileGift";
import MobileMember from "./templates/member/MobileMember";
import MobileNewsletter from "./templates/newsletter/MobileNewsletter";
import MobileLine from "./templates/line/MobileLine";
import MobileCustom from "./templates/custom/MobileCustom";

type Props = {
  data: BannerData;
  template: TemplateId;
};

/**
 * スマホ用バナー（1280×320）の実寸ラッパー。
 * html2canvas のキャプチャ対象としてこの要素に ref を当てる。
 */
const MobileBanner = forwardRef<HTMLDivElement, Props>(function MobileBanner(
  { data, template },
  ref,
) {
  return (
    <div ref={ref} style={{ width: 1280, height: 320 }} className="overflow-hidden">
      {template === "simple" && <MobileSimple data={data} />}
      {template === "sale" && <MobileSale data={data} />}
      {template === "gift" && <MobileGift data={data} />}
      {template === "member" && <MobileMember data={data} />}
      {template === "newsletter" && <MobileNewsletter data={data} />}
      {template === "line" && <MobileLine data={data} />}
      {template === "custom" && <MobileCustom data={data} />}
    </div>
  );
});

export default MobileBanner;
