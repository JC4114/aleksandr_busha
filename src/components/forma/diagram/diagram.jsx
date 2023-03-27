    import React, { useState } from 'react';
    import { Form } from 'react-bootstrap';

    function Diagram() {
    const [size, setSize] = useState(300);

    const handleChange = (e) => {
        setSize(e.target.value);
    }

    const clipPath = `polygon(
        50% 0%,
        75% ${10 * size / 300}%,
        95% ${35 * size / 300}%,
        95% ${65 * size / 300}%,
        75% ${90 * size / 300}%,
        50% 100%,
        25% ${90 * size / 300}%,
        5% ${65 * size / 300}%,
        5% ${35 * size / 300}%,
        25% ${10 * size / 300}%,
        50% 0%,
        75% ${10 * size / 300}%
    )`;

    return (
        <div className="content">
        <div className="diagram" style={{ clipPath }}>
            <Form.Group>
            <Form.Label>Size:</Form.Label>
            <Form.Control type="number" value={size} min={100} max={500} onChange={handleChange} />
            </Form.Group>
        </div>
        </div>
    );
    }

    export default Diagram;
