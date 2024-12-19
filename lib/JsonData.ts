import { promises as fs } from 'fs';

export async function getServerSideProps() {
    try {
      const file = await fs.readFile('../api/markers.json', 'utf-8');
      const data = JSON.parse(file);
      console.log(data)
        return {
            props: {
                
            },
        };
    } catch (error) {
      console.error('Error reading or parsing JSON:', error);
      return {
          props: {
              markerData: []
          }
      }
    }
}