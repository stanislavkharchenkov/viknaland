import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, city, preferredContact, isEvidnovlennya, configSummary, estimatedPrice } = body;

    if (!phone) {
      return NextResponse.json({ error: 'Phone is required' }, { status: 400 });
    }

    const leadRecord = {
      name: name || 'Не вказано',
      phone,
      city: city || 'Київ / Область',
      preferredContact: preferredContact || 'phone',
      isEvidnovlennya: Boolean(isEvidnovlennya),
      configSummary: configSummary || 'Загальна заявка',
      estimatedPrice: estimatedPrice || 0,
      createdAt: new Date().toISOString(),
    };

    console.log('[VIKNALAND NEW LEAD RECEIVED]:', leadRecord);

    // Інтеграція зі Strapi або CRM (якщо налаштований STRAPI_URL)
    const strapiUrl = process.env.STRAPI_URL || 'http://127.0.0.1:1337';
    try {
      await fetch(`${strapiUrl}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: leadRecord }),
      });
    } catch {
      // Якщо Strapi офлайн, заявка зберігається локально
    }

    return NextResponse.json({ success: true, lead: leadRecord });
  } catch (error) {
    console.error('Lead submission error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
