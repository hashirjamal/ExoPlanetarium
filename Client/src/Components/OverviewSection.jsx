import React from 'react'

function OverviewSection() {
  return (
    <>
      <div className="max-w-6xl mx-auto p-5">
        <h1 className="text-6xl font-bold text-gray-950 mt-7">Overview</h1>
        <p className="text-md mt-3">
          Most of the exoplanets discovered so far are in a relatively small
          region of our galaxy, the Milky Way. ("Small" meaning within thousands
          of light-years of our solar system; one light-year equals 5.88
          trillion miles, or 9.46 trillion kilometers.) Even the closest known
          exoplanet to Earth, Proxima Centauri b, is still about 4 light-years
          away. We know there are more planets than stars in the galaxy.
        </p>
        <p className="text-md mt-3">
          By measuring exoplanets’ sizes (diameters) and masses (weights), we
          can see compositions ranging from rocky (like Earth and Venus) to
          gas-rich (like Jupiter and Saturn). Some planets may be dominated by
          water or ice, while others are dominated by iron or carbon. We’ve
          identified lava worlds covered in molten seas, puffy planets the
          density of Styrofoam and dense cores of planets still orbiting their
          stars.
        </p>
      </div>
    </>
  )
}

export default OverviewSection
