import React from 'react';



export default function CustomizedTables({ data }) {

    return (
        <div className='main_table_div'>
            {data.map((value) => (
                <div className='data_div' key={value.attributes.publicationYear}>
                    <div className='cells'>
                        <h3><u> Publisher:</u></h3>
                        <p>{value.attributes.publisher}.</p>
                        <h3><u> PublicationYear:</u></h3>
                        <p className='year'>{value.attributes.publicationYear}.</p>
                        <h3><u> URL</u></h3>
                        <a className='link' href={value.attributes.url} target='__blank'>{value.attributes.url}</a>
                    </div>
                    <div className='cells_subject'>
                        <h3 >Subjects</h3>
                        {value.attributes.subjects.map((val, i) => (
                            <div key={i}>
                                <p className='subject'>{i + 1}) {val.subject}</p>
                            </div>
                        ))}
                    </div>

                </div>
            ))}

        </div>
    );
}