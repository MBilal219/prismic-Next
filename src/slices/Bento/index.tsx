import Bounded from "@/components/Bounded";
import { Content, asText, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";

/**
 * Props for `Bento`.
 */
export type BentoProps = SliceComponentProps<Content.BentoSlice>;

/**
 * Component for "Bento" Slices.
 */
const Bento = ({ slice }: BentoProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="text-center"
    >
      {isFilled.richText(slice.primary.heading) && (
        <PrismicRichText
          field={slice.primary.heading}
          components={{
            heading2: ({ children }) => (
              <h2 className="text-balance text-5xl font-medium md:text-7xl">
                {children}
              </h2>
            ),
            em: ({ children }) => (
              <em className="bg-gradient-to-b from-yellow-100 to-yellow-500 bg-clip-text not-italic text-transparent">
                {children}
              </em>
            ),
          }}
        />
      )}
      {isFilled.richText(slice.primary.description) && (
        <div className="mx-auto mt-6 max-w-md text-balance text-center text-slate-300">
          <PrismicRichText field={slice.primary.description} />
        </div>
      )}
      <div className="mt-16 grid max-w-4xl grid-rows-[auto_auto_auto] gap-8 md:grid-cols-3 md:gap-10">
        {slice.items.map((item, idx) => (
          <div
            className="glass-container gird row-span-3 grid-rows-subgrid gap-4 rounded-lg bg-gradient-to-b from-gray-900 to-gray-950 p-4"
            key={idx + asText(item.title)}
          >
            <h3 className="text-2xl">
              <PrismicText field={item.title} />
            </h3>
            <div className="max-w-md text-balance text-slate-300">
              <PrismicRichText field={item.body} />
            </div>
            <PrismicNextImage field={item.image} />
          </div>
        ))}
      </div>
    </Bounded>
  );
};

export default Bento;
