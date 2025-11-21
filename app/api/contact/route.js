"use server";

export async function POST(req) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return Response.json(
        { message: "Please fill out your name, email, and message." },
        { status: 400 }
      );
    }

    // In a real app this is where you'd send an email or persist the message.
    console.log("New contact submission:", { name, email, message });

    return Response.json({
      message: "Thanks for reaching out! I'll get back to you soon.",
    });
  } catch (err) {
    return Response.json(
      { message: "Something went wrong sending your message." },
      { status: 500 }
    );
  }
}
