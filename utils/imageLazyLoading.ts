import promiseLimit from "promise-limit";

const limit = promiseLimit(3);

const lazyLoad = (image: HTMLImageElement, src: string) => {
  return new Promise((resolve, reject) => {
    image.onload = resolve;
    image.onerror = reject;
    image.src = src;
  });
};

const imageLazyLoading = () => {
  if (document) {
    const containers = document.querySelectorAll<HTMLDivElement>(
      ".lazy-image-container"
    );
    const observer = new IntersectionObserver(function (entries) {
      Promise.all(
        entries.map((entry) =>
          limit(async () => {
            if (entry.intersectionRatio > 0) {
              const container = entry.target as HTMLDivElement;
              const image = new Image();
              const imageSrc = container.dataset.src || "";

              await lazyLoad(image, imageSrc).catch((err) => {
                console.log({ image, error: err });
                return err;
              });
              container.appendChild(image);
              observer.unobserve(container);
              return;
            }
            return;
          })
        )
      );
    });

    containers.forEach(function (container) {
      observer.observe(container);
    });
  }
};

export default imageLazyLoading;
