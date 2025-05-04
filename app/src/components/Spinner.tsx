import React from 'react'

type SpinnerProps = React.HTMLAttributes<HTMLOrSVGElement>

const Spinner = ({ ...props }: SpinnerProps) => {
  return (
    <>
      <svg
        {...props}
        viewBox="0 0 50 50"
        style={{
          width: '50px',
          height: '50px',
          animation: 'rotate 2s linear infinite',
        }}
      >
        <circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke="#4f46e5"
          strokeWidth="5"
          strokeLinecap="round"
          style={{
            strokeDasharray: '1, 150',
            strokeDashoffset: 0,
            animation: 'dash 1.5s ease-in-out infinite',
          }}
        />
      </svg>

      <style>
        {`
          @keyframes rotate {
            100% {
              transform: rotate(360deg);
            }
          }
          @keyframes dash {
            0% {
              stroke-dasharray: 1, 150;
              stroke-dashoffset: 0;
            }
            50% {
              stroke-dasharray: 90, 150;
              stroke-dashoffset: -35;
            }
            100% {
              stroke-dasharray: 90, 150;
              stroke-dashoffset: -124;
            }
          }
        `}
      </style>
    </>
  )
}

export default Spinner
