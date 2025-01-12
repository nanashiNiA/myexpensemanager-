export async function POST(req) {
    return new Response(JSON.stringify({ message: 'Logged out successfully' }), { status: 200 });
  }
  