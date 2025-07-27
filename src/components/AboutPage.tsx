export default function AboutPage() {
  return (
    <div className="">
      <p className="text-lg mb-2 font-semibold">
        This application was developed as part of the{' '}
        <a
          href="https://rs.school/courses/reactjs"
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-600 underline"
        >
          React course at RS School
        </a>
        .
      </p>
      <p className="text-lg mb-2 font-semibold">
        Created by Elena Iakovenko. All Information about me is{' '}
        <a
          href="https://github.com/Elena-MyOne"
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-600 underline"
        >
          here
        </a>
      </p>
    </div>
  );
}
