import * as React from "react"
import Layout from "../components/layout"
import { StaticImage } from "gatsby-plugin-image"

const CommunityPage = () => {
  const [selectedImage, setSelectedImage] = React.useState(null)
  const [modalImageSrc, setModalImageSrc] = React.useState(null)

  const openModal = (index, event) => {
    setSelectedImage(index)
    // Get the actual image src from the clicked element
    const imgElement = event.currentTarget.querySelector('img')
    if (imgElement) {
      setModalImageSrc(imgElement.currentSrc || imgElement.src)
    }
  }

  const closeModal = () => {
    setSelectedImage(null)
    setModalImageSrc(null)
  }

  const images = [
    { alt: "CNCF Toronto Meetup" },
    { alt: "CNCF Toronto Meetup" },
    { alt: "CNCF Toronto Meetup" },
    { alt: "CNCF Toronto Meetup" },
    { alt: "CNCF Toronto Meetup" },
    { alt: "CNCF Toronto Meetup" },
    { alt: "CNCF Toronto Meetup" },
    { alt: "CNCF Toronto Meetup" },
    { alt: "CNCF Toronto Meetup" },
    { alt: "CNCF Toronto Meetup" },
  ]

  return (
    <Layout>
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title is-1">Our Community</h1>
            <p className="subtitle is-3">The heart of cloud native in Toronto</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="content has-text-centered mb-6">
            <h2 className="title is-2">CNCF Toronto Meetups</h2>
            <p className="is-size-5">
              Our vibrant community comes together regularly to share knowledge, learn, and connect.
              These photos capture the spirit of collaboration and innovation that defines our meetups.
            </p>
            <p className="has-text-grey mt-3">
              <small>Click any photo to enlarge</small>
            </p>
          </div>

          <div className="photo-gallery">
            <div className="photo-gallery-item" onClick={(e) => openModal(0, e)}>
              <StaticImage
                src="../images/community/IMG_0762.jpeg"
                alt="CNCF Toronto Meetup"
                placeholder="blurred"
              />
            </div>
            <div className="photo-gallery-item" onClick={(e) => openModal(1, e)}>
              <StaticImage
                src="../images/community/IMG_0816.jpeg"
                alt="CNCF Toronto Meetup"
                placeholder="blurred"
              />
            </div>
            <div className="photo-gallery-item" onClick={(e) => openModal(2, e)}>
              <StaticImage
                src="../images/community/IMG_1188.jpeg"
                alt="CNCF Toronto Meetup"
                placeholder="blurred"
              />
            </div>
            <div className="photo-gallery-item" onClick={(e) => openModal(3, e)}>
              <StaticImage
                src="../images/community/IMG_2691.jpeg"
                alt="CNCF Toronto Meetup"
                placeholder="blurred"
              />
            </div>
            <div className="photo-gallery-item" onClick={(e) => openModal(4, e)}>
              <StaticImage
                src="../images/community/IMG_2717.jpeg"
                alt="CNCF Toronto Meetup"
                placeholder="blurred"
              />
            </div>
            <div className="photo-gallery-item" onClick={(e) => openModal(5, e)}>
              <StaticImage
                src="../images/community/IMG_5050.jpeg"
                alt="CNCF Toronto Meetup"
                placeholder="blurred"
              />
            </div>
            <div className="photo-gallery-item" onClick={(e) => openModal(6, e)}>
              <StaticImage
                src="../images/community/IMG_6734.jpeg"
                alt="CNCF Toronto Meetup"
                placeholder="blurred"
              />
            </div>
            <div className="photo-gallery-item" onClick={(e) => openModal(7, e)}>
              <StaticImage
                src="../images/community/IMG_8504.jpeg"
                alt="CNCF Toronto Meetup"
                placeholder="blurred"
              />
            </div>
            <div className="photo-gallery-item" onClick={(e) => openModal(8, e)}>
              <StaticImage
                src="../images/community/IMG_9719.jpeg"
                alt="CNCF Toronto Meetup"
                placeholder="blurred"
              />
            </div>
            <div className="photo-gallery-item" onClick={(e) => openModal(9, e)}>
              <StaticImage
                src="../images/community/IMG_9854.jpeg"
                alt="CNCF Toronto Meetup"
                placeholder="blurred"
              />
            </div>
          </div>

          {/* Photo Modal */}
          <div
            className={`photo-modal ${selectedImage !== null ? 'active' : ''}`}
            onClick={closeModal}
          >
            {selectedImage !== null && modalImageSrc && (
              <img
                src={modalImageSrc}
                alt={images[selectedImage].alt}
                className="photo-modal-content"
              />
            )}
          </div>

          <div className="box has-background-primary-light mt-6">
            <h3 className="title is-3 has-text-centered">Join Our Meetups</h3>
            <div className="content has-text-centered">
              <p className="is-size-5">
                Want to be part of the Toronto cloud native community? Join us at our monthly meetups
                to learn, network, and contribute to the ecosystem.
              </p>
              <div className="buttons is-centered mt-5">
                <a
                  href="https://www.meetup.com/cloud-native-toronto/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button is-primary is-large"
                >
                  <strong>Join Our Meetup Group</strong>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default CommunityPage

export const Head = () => <title>Our Community - KCD Toronto 2026</title>
