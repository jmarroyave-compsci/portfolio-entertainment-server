import DBTopic from 'v3/models/topic';
import { shuffle } from 'lib/array';

export const get = async function( params ) {
  const year = ( params.year ) ? parseInt(params.year) : null;
  const genre = ( params.genre ) ? params.genre.replace("-", "_") : null;
  const page = ( params.page ) ? parseInt(params.page) : 1;
  const pageSize = (year === 0) ? 0 : 10;

  //const query = { decade : true }
  const query = {  }

  if( year && year != 0 ) {
    query['year'] = { $in : [ (year - 10), year, (year + 10)] }
  } 

  if( genre && genre != "all" ) query['genre'] = genre

  console.log(query)


  const data =  await DBTopic.find( query )
      .skip( pageSize * (page - 1) )
      .limit(pageSize);

  return data.map( d => {
    const words = d['words'].slice(0, ( year == 0 ) ? 10 : 200 );
    return {
      year: d['year'],
      genre: d['genre'],
      words: words,
      max: (words[0]) ? words[0]['n'] : 0,
      min: (words[0]) ? words[words.length - 1]['n'] : 0,
    }
  })
}

export const getTopic = async function( params ) {
  const topic = ( params.topic ) ? params.topic : null;
  if(!topic) return []

  const query = { $text: { $search : topic } }

  const data =  await DBTopic.find( query, { year: 1, genre: 1, _id: 0 } )
      .limit(1000)
      .sort({ year: 1, genre: 1});

  return data;
}