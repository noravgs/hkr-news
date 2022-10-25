import { useState, useEffect } from "react"
// import format from "date-fns/format"
// You can use the import above or the one below
import { format } from "date-fns"

export default function FetchNews() {
  const [items, setItems] = useState([])
  const [query, setQuery] = useState("AI")
  const [text, setText] = useState("")
  const [largeTitle, setLargeTitle] = useState([])
  const [isLoading, setIsLoading] = useState(true) // loading state

  useEffect(() => {
    setIsLoading(true)

    const fetchNews = async () => {
      const url = `https://hn.algolia.com/api/v1/search?query=${query}`
      const res = await fetch(url)
      const data = await res.json()
      // You can change the number of items you get back in your response using
      // the `Array.length` method, as demonstrated below. Uncomment the line and
      // reload your app to see it in action.
      // data.hits.length = 10
      setItems(data.hits)
      setLargeTitle(data.hits[0])
    }

    fetchNews()
    setIsLoading(false)
  }, [query])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!text) {
      console.log("Input is empty")
    } else {
      setQuery(text)
      setText("")
      console.log(text)
      console.log(query)
    }
  }

  return (
    <div className="container flex items-center my-12 mx-auto px-4 md:px-12">
      <main>
        {isLoading ? (
          <div className="spinner"></div>
        ) : (
          <>
          <h1>HKR News</h1>
            {/* Search form */}
            <div className="flex items-center">
            <form
              onSubmit={handleSubmit}
              className="pt-2 flex items-center mx-auto text-gray-600"
            >
              <input
                type="text"
                name="text"
                id="text"
                placeholder="Search for something..."
                autoComplete="off"
                required
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
              />
              <button
                type="submit"
                onClick={handleSubmit}
                className="btn inline-block px-6 py-3 bg-[#f8961e] text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-[#fb5607] hover:shadow-lg focus:bg-[#f8961e]  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#fb5607] active:shadow-lg transition duration-150 ease-in-out flex items-center"
              > search
               {/* <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" class="w-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
        </svg> */}
              </button>
            </form>
            </div>
            {/* End of search form */}

            <article className="">
              <h1 className="mb-4 text-2xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-black">
                {largeTitle.title}
              </h1>
              <a
                href={largeTitle.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center text-lg text-[#f8961e] dark:text-[#f8961e] hover:underline"
              >
                Read Full Story
                <svg class="ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
              </a>
            </article>

            <article className="">
              <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-500">
                Category:{" "}
                <span className="">
                  {query}
                </span>
              </p>
            </article>

            <section className="">
              {items.map((item) => {
                const { author, created_at, objectID, title, url } = item

                return (
                  <article
                    key={objectID}
                    className=""
                  >
                    <h3 className="text-4xl font-extrabold dark:text-black">
                      {title}
                    </h3>
                    <article className="">
                      <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-500">
                        By {author}
                      </p>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopenner noreferrer"
                        className="inline-flex items-center text-lg text-blue-600 dark:text-[#f8961e] hover:underline"
                      >
                        Read More
                        <svg class="ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                      </a>
                    </article>
                    <span className="text-gray-500">
                      {/* Format date using the `format` method from `date-fns` */}
                      {format(new Date(created_at), "dd MMM yyyy")}
                    </span>
                  </article>
                )
              })}
            </section>
          </>
        )}
      </main>
    </div>
  )
}