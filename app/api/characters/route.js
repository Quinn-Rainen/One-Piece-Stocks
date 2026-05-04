import { supabase } from '../../../lib/supabase'


export async function GET() {
  const { data, error } = await supabase
    .from('characters')
    .select('*')
    .order('current_price', { ascending: false })

  if (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }

  return Response.json(data)
}


export async function POST(request) {
  const body = await request.json()
  const { name, crew, current_price } = body

  if (!name || !crew || !current_price) {
    return Response.json({ error: 'Name, crew and price are required' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('characters')
    .insert([{ name, crew, current_price }])
    .select()

  if (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }

  return Response.json(data[0], { status: 201 })
}