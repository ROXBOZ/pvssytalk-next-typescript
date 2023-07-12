export const PortableTextInternalLink = (props) => (
  <PortableTextComponent
    components={{
      marks: {
        internalLink: ({ children, value }) => {
          return (
            <Link href={`/post/${value.slug.current}`}>
              <a> {children}</a>
            </Link>
          );
        },
      },
    }}
    {...props}
  />
);
