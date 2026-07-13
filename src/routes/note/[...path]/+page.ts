/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  return {
    params: {
      path: params.path,
    },
  };
}
