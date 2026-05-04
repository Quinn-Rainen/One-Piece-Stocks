import { supabase } from '../../../../lib/supabase'

export async function PUT(request, { params }) {
  const body = await request.json()
  const { current_price } = body
  const { id } = await params

  const { data, error } = await supabase
    .from('characters')
    .update({ current_price })
    .eq('id', id)
    .select()

  if (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }

  return Response.json(data[0])
}

export async function DELETE(request, { params }) {
  const { id } = await params

  const { error } = await supabase
    .from('characters')
    .delete()
    .eq('id', id)

  if (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }

  return Response.json({ message: 'Character deleted' })
}