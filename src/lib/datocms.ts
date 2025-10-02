const API_TOKEN = import.meta.env.DATOCMS_API_TOKEN;

export async function fetchDatoCMS(query: string, variables = {}) {
    const res = await fetch('https://graphql.datocms.com/', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query,
            variables,
        }),
    });

    const json = await res.json();

    if (json.errors) {
        console.error('DatoCMS Error:', JSON.stringify(json.errors, null, 2));
        throw new Error('Failed to fetch data from DatoCMS');
    }

    return json.data;
}