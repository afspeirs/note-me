/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  return {
    params: {
      id: params.id,
    },
  };
}
