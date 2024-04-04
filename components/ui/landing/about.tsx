import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="p-16 py-20 md:px-28 md:py-20" id="about">
      <div className="container mx-auto px-4 md:grid md:grid-cols-2 md:items-center">
        <div className="mb-8 w-full md:mb-0">
          <h2 className="mb-4 text-2xl font-bold leading-tight">
            About SikshaYatri
          </h2>
          <p className="mb-2 text-sm leading-relaxed text-gray-700">
            We&apos;re a team of passionate students tired of the same old,
            boring e-learning platforms. We believe learning should be engaging,
            effective, and accessible to everyone. That&apos;s why we created
            SikshaYatri, a platform that cuts through the fluff and gets you
            the skills you need, fast.
          </p>
          <p className="text-sm text-gray-800">
            Our major objectives for creating this platforms
          </p>
          <ul className="text-sm text-gray-700">
            <li>
              <p>
                <b>Flexible Learning: </b>
                Learn at your own pace, on your own time. Our platform is
                accessible 24/7, so you can fit learning into your busy
                schedule.
              </p>
            </li>
            <li>
              <p>
                <b>Affordable Pricing: </b>
                We believe everyone deserves access to quality education, which
                is why we offer competitive (free) pricing options.
              </p>
            </li>
            <li>
              <p>
                <b>Lorem, ipsum. </b>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Fugiat, natus nostrum qui voluptas totam reiciendis.
              </p>
            </li>
            <li>
              <p>
                <b>Lorem, ipsum. </b>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Veritatis qui suscipit excepturi minima? Voluptatem eius quis
                nemo aliquid in corrupti.
              </p>
            </li>
          </ul>
        </div>
        <div className="relative flex items-center justify-center">
          <Image
            src="https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            height={1000}
            width={1000}
            // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            alt="Company about us"
            // layout="fill"
            className="h-auto w-4/5 rounded-lg object-cover shadow-md"
          />
        </div>
      </div>
      <div className="m-5 flex items-center justify-center">
        <h4 className={`text-base font-medium`}>
          Sign up today to join our platform!
        </h4>
      </div>
    </section>
  );
}
