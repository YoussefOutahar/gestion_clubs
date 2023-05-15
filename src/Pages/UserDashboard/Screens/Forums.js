import { Calendar } from 'antd';

export default function UserForumsPage(props) {
    const onPanelChange = (value, mode) => {
        console.log(value.format('YYYY-MM-DD'), mode);
      };
    return (
        <>
            <Calendar onPanelChange={onPanelChange} />
        </>
    );
}
