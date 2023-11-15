import { ReactNode } from "react"



export function FormWrapper({ title, children }) {
  return (
    <>
      <h1
        // style={{ textAlign: "center", margin: 0, marginBottom: "2rem" }}
        className="font-bold text-3xl sm:text-[42px] mt-10 sm:mt-16 mb-auto sm:mb-2"
      >
        {title}
      </h1>
      <div
      // style={{
      //   display: "grid",
      //   gap: "1rem .5rem",
      //   justifyContent: "flex-start",
      //   gridTemplateColumns: "auto minmax(auto, 400px)",
      // }}
      >
        {children}
      </div>
    </>
  )
}