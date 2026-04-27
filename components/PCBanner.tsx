"use client";

import { forwardRef } from "react";
import type { BannerData, TemplateId } from "@/lib/types";
import PCSimple from "./templates/simple/PCSimple";
import PCSale from "./templates/sale/PCSale";
import PCGift from "./templates/gift/PCGift";
import PCMember from "./templates/member/PCMember";
import PCNewsletter from "./templates/newsletter/PCNewsletter";
import PCLine from "./templates/line/PCLine";
import PCCustom from "./templates/custom/PCCustom";

type Props = {
  data: BannerData;
  template: TemplateId;
};

/**
 * PC 用バナー（1080×1080）の実寸ラッパー。
 * html2canvas のキャプチャ対象としてこの要素に ref を当てる。
 */
const PCBanner = forwardRef<HTMLDivElement, Props>(function PCBanner({ data, template }, ref) {
  return (
    <div ref={ref} style={{ width: 1080, height: 1080 }} className="overflow-hidden">
      {template === "simple" && <PCSimple data={data} />}
      {template === "sale" && <PCSale data={data} />}
      {template === "gift" && <PCGift data={data} />}
      {template === "member" && <PCMember data={data} />}
      {template === "newsletter" && <PCNewsletter data={data} />}
      {template === "line" && <PCLine data={data} />}
      {template === "custom" && <PCCustom data={data} />}
    </div>
  );
});

export default PCBanner;
