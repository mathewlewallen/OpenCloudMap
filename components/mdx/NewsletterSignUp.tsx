"use client";

import { useState, FormEvent } from "react";
import { motion } from "motion/react";
import { GridWrapper } from "@/components/mdx/GridWrapper";
import { createContact } from "@/lib/actions";

interface NewsletterSignUpProps {
  title?: string;
  description?: string;
  buttonText?: string;
}

interface FormState {
  email: string;
  message: string;
  isSuccess: boolean;
  isLoading: boolean;
}

export function NewsletterSignUp({
  title = "Subscribe to my newsletter",
  description = "A periodic update about aviation, this site, my posts, and research.",
  buttonText = "Subscribe",
}: NewsletterSignUpProps) {
  const [formState, setFormState] = useState<FormState>({
    email: "",
    message: "",
    isSuccess: false,
    isLoading: false,
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState((prev) => ({
      ...prev,
      message: "",
      isSuccess: false,
      isLoading: true,
    }));

    if (!formState.email) {
      setFormState((prev) => ({
        ...prev,
        message: "Please provide an email address.",
        isLoading: false,
      }));
      return;
    }

    try {
      const result = await createContact(formState.email);

      if (result.success) {
        setFormState((prev) => ({
          ...prev,
          message: "You're signed up!",
          isSuccess: true,
          email: "",
        }));
      } else {
        setFormState((prev) => ({
          ...prev,
          message: "Something went wrong.",
          isSuccess: false,
        }));
      }
    } catch (error) {
      setFormState((prev) => ({
        ...prev,
        message: "Something went wrong.",
        isSuccess: false,
      }));
      console.error(error);
    } finally {
      setFormState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  return (
    <div className="relative pb-16">
      <GridWrapper>
        <div className="relative overflow-x-clip">
          <div className="drama-shadow rounded-2xl bg-dark-primary p-14 md:p-[100px]">
            {/* Lines */}
            <div className="absolute left-0 right-0 top-[34px] z-10 h-px w-full bg-zinc-600 md:top-[48px]"></div>
            <div className="absolute bottom-0 right-[34px] top-0 z-10 h-full w-px bg-zinc-600 md:right-[48px]"></div>
            <div className="absolute bottom-[34px] left-0 right-0 z-10 h-px w-full bg-zinc-600 md:bottom-[48px]"></div>
            <div className="absolute bottom-0 left-[34px] top-0 z-10 h-full w-px bg-zinc-600 md:left-[48px]"></div>

            {/* Top Right Cross */}
            <div className="absolute right-[44.5px] top-[48px] z-20 hidden h-px w-2 bg-zinc-300 md:block"></div>
            <div className="absolute right-[48px] top-[44.5px] z-20 hidden h-2 w-px bg-zinc-300 md:block"></div>
            {/* Top Left Cross */}
            <div className="absolute left-[44.5px] right-0 top-[48px] z-20 hidden h-px w-2 bg-zinc-300 md:block"></div>
            <div className="absolute left-[48px] right-0 top-[44.5px] z-20 hidden h-2 w-px bg-zinc-300 md:block"></div>
            {/* Bottom Left Cross */}
            <div className="absolute bottom-[48px] left-[44.5px] right-0 z-20 hidden h-px w-2 bg-zinc-300 md:block"></div>
            <div className="absolute bottom-[44.5px] left-[48px] right-0 z-20 hidden h-2 w-px bg-zinc-300 md:block"></div>
            {/* Bottom Right Cross */}
            <div className="absolute bottom-[48px] right-[44.5px] z-20 hidden h-px w-2 bg-zinc-300 md:block"></div>
            <div className="absolute bottom-[44.5px] right-[48px] z-20 hidden h-2 w-px bg-zinc-300 md:block"></div>

            <h2 className="mb-4 text-3xl font-medium text-slate-50">{title}</h2>
            <p className="z-50 mb-8 max-w-[336px] text-base leading-8 text-gray-300 md:mb-12">
              {description}
            </p>
            <div className="z-50 mb-4 space-y-4">
              <form
                onSubmit={handleSubmit}
                className="relative md:inline-block"
              >
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="example@gmail.com"
                  value={formState.email}
                  onChange={(e) =>
                    setFormState((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className="w-full rounded-full border border-gray-400 bg-transparent px-5 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-100 focus:ring-offset-2 focus:ring-offset-dark-primary md:w-[425px]"
                  disabled={formState.isLoading}
                />
                <button
                  type="submit"
                  className="group absolute right-1 top-1 isolate inline-flex h-[42px] items-center justify-center overflow-hidden rounded-full bg-slate-100 px-4 py-2.5 text-left text-sm font-medium text-slate-900 shadow-[0_1px_theme(colors.white/0.07)_inset,0_1px_3px_theme(colors.gray.900/0.2)] ring-1 ring-white transition duration-300 ease-[cubic-bezier(0.4,0.36,0,1)] before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded-full before:bg-gradient-to-b before:from-white/20 before:opacity-50 before:transition-opacity before:duration-300 before:ease-[cubic-bezier(0.4,0.36,0,1)] after:pointer-events-none after:absolute after:inset-0 after:-z-10 after:rounded-full after:bg-gradient-to-b after:from-white/10 after:from-[46%] after:to-[54%] after:mix-blend-overlay hover:before:opacity-100"
                  disabled={formState.isLoading}
                >
                  {formState.isLoading ? "Loading..." : buttonText}
                </button>
              </form>
              {/* Set minimum height to prevent layout shift */}
              <div className="min-h-[15px] md:min-h-[30px]">
                {formState.message && (
                  <p
                    className={`text-sm ${
                      formState.isSuccess ? "text-indigo-300" : "text-rose-400"
                    }`}
                  >
                    {formState.message}
                  </p>
                )}
              </div>
            </div>
            <p className="text-base text-gray-300">
              <span className="font-bold text-white">NO SPAM.</span> I never
              send spam. You can unsubscribe at any time!
            </p>
            <svg
              className="absolute -top-8 right-0 z-10 hidden lg:block"
              width="453"
              height="501"
              viewBox="0 0 453 501"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_i_185_3161)">
                <path
                  d="M 394.500 98.880 C 379.403 107.375, 370.084 113.129, 363.586 117.964 C 355.078 124.295, 328.419 147.372, 311.718 162.862 C 303.038 170.913, 293.375 179.645, 290.246 182.268 L 284.555 187.035 278.606 181.086 L 272.656 175.136 260.578 185.882 L 248.500 196.629 217 206.302 C 182.706 216.832, 159.921 222.910, 124.607 230.945 C 89.704 238.886, 90.074 238.741, 84.247 246.770 C 78.850 254.205, 71.617 266.319, 70.598 269.627 C 69.951 271.730, 70.167 271.762, 89.544 272.489 C 100.325 272.893, 126.325 272.908, 147.323 272.522 L 185.500 271.820 176.500 280.798 L 167.500 289.775 121.519 300.393 L 75.538 311.012 68.769 317.729 C 65.046 321.424, 62 324.917, 62 325.492 C 62 326.068, 68.040 330.027, 75.422 334.290 C 82.803 338.553, 92.928 344.723, 97.922 348.002 C 108.056 354.656, 108.423 355.432, 104.831 362.623 L 102.663 366.966 108.331 372.909 C 111.449 376.177, 113.989 379.222, 113.975 379.676 C 113.961 380.129, 110.782 384.325, 106.910 389 C 96.078 402.080, 90.803 409.002, 91.692 408.975 C 92.594 408.947, 96.305 406.098, 110.224 394.750 C 115.451 390.488, 120.163 387, 120.694 387 C 121.225 387, 124.394 389.475, 127.737 392.500 C 131.080 395.525, 134.315 398, 134.927 398 C 135.539 398, 137.822 396.875, 140 395.500 C 142.178 394.125, 144.601 393, 145.383 393 C 146.817 393, 152.226 401.391, 166.494 425.750 C 170.763 433.038, 174.546 439, 174.903 439 C 175.259 439, 178.775 435.738, 182.716 431.750 L 189.883 424.500 200.470 378.500 L 211.056 332.500 219.528 324.007 L 228 315.514 228 372.757 C 228 411.182, 228.337 430, 229.025 430 C 230.687 430, 243.542 423.280, 250.887 418.572 C 262.355 411.221, 262.133 411.727, 269.995 375.168 C 278.115 337.404, 282.759 320.059, 296.649 275.602 L 304.115 251.704 314.722 239.797 L 325.328 227.890 319.474 221.974 L 313.619 216.057 317.012 211.779 C 318.879 209.425, 325.661 201.875, 332.084 195 C 357.424 167.879, 381.555 139.308, 388.673 128 C 400.665 108.949, 409.687 91.967, 407.764 92.063 C 407.069 92.098, 401.100 95.165, 394.500 98.880"
                  fill="url(#paint0_linear_185_3161)"
                />

              </g>
              <defs>
                <filter
                  id="filter0_i_185_3161"
                  x="0"
                  y="0"
                  width="500"
                  height="500"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                  />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="2" />
                  <feGaussianBlur stdDeviation="2" />
                  <feComposite
                    in2="hardAlpha"
                    operator="arithmetic"
                    k2="-1"
                    k3="1"
                  />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="shape"
                    result="effect1_innerShadow_185_3161"
                  />
                </filter>
                <motion.linearGradient
                  id="paint0_linear_185_3161"
                  x1="250.5"
                  y1="119.845"
                  x2="250.5"
                  y2="501"
                  gradientUnits="userSpaceOnUse"
                >
                  <motion.stop
                    animate={{
                      stopColor: formState.isSuccess ? "#4f46e5" : "#4B4B4F",
                    }}
                    transition={{ duration: 0.5 }}
                  />
                  <motion.stop
                    offset="1"
                    animate={{
                      stopColor: formState.isSuccess ? "#818cf8" : "#3C3C3F",
                      stopOpacity: formState.isSuccess ? 1 : 0,
                    }}
                    transition={{ duration: 0.5 }}
                  />
                </motion.linearGradient>
                <motion.linearGradient
                  id="paint1_linear_185_3161"
                  x1="236.758"
                  y1="59.688"
                  x2="236.758"
                  y2="418.249"
                  gradientUnits="userSpaceOnUse"
                >
                  <motion.stop
                    animate={{
                      stopColor: formState.isSuccess ? "#4f46e5" : "#4B4B4F",
                    }}
                    transition={{ duration: 0.5 }}
                  />
                  <motion.stop
                    offset="1"
                    animate={{
                      stopColor: formState.isSuccess ? "#818cf8" : "#3C3C3F",
                    }}
                    transition={{ duration: 0.5 }}
                  />
                </motion.linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </GridWrapper>
      <span className="absolute bottom-6 left-8">
        <svg
          width="24"
          height="14"
          viewBox="0 0 24 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.24"
            d="M0.827592 6.88352V6.01349C1.39104 6.01349 1.7838 5.89915 2.00586 5.67045C2.23124 5.43845 2.34393 5.06226 2.34393 4.5419V3.27415C2.34393 2.71401 2.41353 2.25497 2.55273 1.89702C2.69525 1.53906 2.9024 1.26065 3.17418 1.06179C3.44596 0.862926 3.7774 0.725378 4.1685 0.649147C4.5596 0.569602 5.00373 0.52983 5.50089 0.52983V1.91193C5.10979 1.91193 4.80984 1.96662 4.60103 2.07599C4.39222 2.18205 4.24805 2.34612 4.1685 2.56818C4.09227 2.79025 4.05415 3.07363 4.05415 3.41832V5.04901C4.05415 5.30421 4.01107 5.54285 3.92489 5.76491C3.83872 5.98698 3.68129 6.18253 3.45259 6.35156C3.2239 6.51728 2.89743 6.6482 2.47319 6.74432C2.05226 6.83712 1.50373 6.88352 0.827592 6.88352ZM5.50089 13.1626C5.00373 13.1626 4.5596 13.1229 4.1685 13.0433C3.7774 12.9671 3.44596 12.8295 3.17418 12.6307C2.9024 12.4318 2.69525 12.1534 2.55273 11.7955C2.41353 11.4375 2.34393 10.9785 2.34393 10.4183V9.15554C2.34393 8.63518 2.23124 8.26065 2.00586 8.03196C1.7838 7.79995 1.39104 7.68395 0.827592 7.68395V6.81392C1.50373 6.81392 2.05226 6.86198 2.47319 6.9581C2.89743 7.0509 3.2239 7.18182 3.45259 7.35085C3.68129 7.51657 3.83872 7.71046 3.92489 7.93253C4.01107 8.15459 4.05415 8.39157 4.05415 8.64347V10.2741C4.05415 10.6188 4.09227 10.9022 4.1685 11.1243C4.24805 11.3464 4.39222 11.5121 4.60103 11.6214C4.80984 11.7308 5.10979 11.7855 5.50089 11.7855V13.1626ZM0.827592 7.68395V6.01349H2.40359V7.68395H0.827592ZM14.4286 0.340908L11.1474 12.5312H9.57138L12.8526 0.340908H14.4286ZM23.1712 6.81392V7.68395C22.6077 7.68395 22.2133 7.79995 21.9879 8.03196C21.7659 8.26065 21.6548 8.63518 21.6548 9.15554V10.4183C21.6548 10.9785 21.5836 11.4375 21.4411 11.7955C21.3018 12.1534 21.0964 12.4318 20.8246 12.6307C20.5528 12.8295 20.2214 12.9671 19.8303 13.0433C19.4392 13.1229 18.995 13.1626 18.4979 13.1626V11.7855C18.889 11.7855 19.1889 11.7308 19.3977 11.6214C19.6065 11.5121 19.7491 11.3464 19.8253 11.1243C19.9048 10.9022 19.9446 10.6188 19.9446 10.2741V8.64347C19.9446 8.39157 19.9877 8.15459 20.0739 7.93253C20.16 7.71046 20.3175 7.51657 20.5462 7.35085C20.7749 7.18182 21.0997 7.0509 21.5206 6.9581C21.9448 6.86198 22.495 6.81392 23.1712 6.81392ZM18.4979 0.52983C18.995 0.52983 19.4392 0.569602 19.8303 0.649147C20.2214 0.725378 20.5528 0.862926 20.8246 1.06179C21.0964 1.26065 21.3018 1.53906 21.4411 1.89702C21.5836 2.25497 21.6548 2.71401 21.6548 3.27415V4.5419C21.6548 5.06226 21.7659 5.43845 21.9879 5.67045C22.2133 5.89915 22.6077 6.01349 23.1712 6.01349V6.88352C22.495 6.88352 21.9448 6.83712 21.5206 6.74432C21.0997 6.6482 20.7749 6.51728 20.5462 6.35156C20.3175 6.18253 20.16 5.98698 20.0739 5.76491C19.9877 5.54285 19.9446 5.30421 19.9446 5.04901V3.41832C19.9446 3.07363 19.9048 2.79025 19.8253 2.56818C19.7491 2.34612 19.6065 2.18205 19.3977 2.07599C19.1889 1.96662 18.889 1.91193 18.4979 1.91193V0.52983ZM23.1712 6.01349V7.68395H21.5952V6.01349H23.1712Z"
            fill="#A5AEB8"
          />
        </svg>
      </span>
      <span className="absolute bottom-6 right-8">
        <svg
          width="24"
          height="8"
          viewBox="0 0 24 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_i_185_3210)">
            <rect width="24" height="8" rx="1" fill="#EDEEF2" />
          </g>
          <defs>
            <filter
              id="filter0_i_185_3210"
              x="0"
              y="0"
              width="24"
              height="9.5"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="2" />
              <feGaussianBlur stdDeviation="0.75" />
              <feComposite
                in2="hardAlpha"
                operator="arithmetic"
                k2="-1"
                k3="1"
              />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.647059 0 0 0 0 0.682353 0 0 0 0 0.721569 0 0 0 0.32 0"
              />
              <feBlend
                mode="normal"
                in2="shape"
                result="effect1_innerShadow_185_3210"
              />
            </filter>
          </defs>
        </svg>
      </span>
    </div>
  );
}
