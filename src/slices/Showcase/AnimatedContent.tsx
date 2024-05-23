"use client";
import { Fragment, ReactNode, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import usePrefersReducedMotion from "@/hooks/usePrefersReducesMotions";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const AnimatedContent = ({ children }: { children: ReactNode }) => {
  const container = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  gsap.registerPlugin(useGSAP, ScrollTrigger);

  useGSAP(
    () => {
      if (prefersReducedMotion) {
        gsap.set(container.current, { y: 0 });
        return;
      }

      gsap.fromTo(
        container.current,
        { y: 100 },
        {
          y: 0,
          ease: "power2.inOut",
          duration: 1,
          scrollTrigger: {
            trigger: container.current,
            start: "top bottom-=40%", //when yop of the element hits bottom of the viewport with -40%
            toggleActions: "play pause resume reverse",
            // markers: true, //debugger
          },
        },
      );
    },
    { scope: container },
  );

  return <div ref={container}>{children}</div>;
};

export default AnimatedContent;
