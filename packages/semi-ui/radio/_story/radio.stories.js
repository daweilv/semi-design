import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import Button from '../../button';
import Space from '../../space';

import { Radio, RadioGroup } from '../../index';
import { Row, Col } from '../../grid';
import './radio.scss';

const stories = storiesOf('Radio', module);

// stories.addDecorator(withKnobs);;

stories.add('radio', () => {
    let cssStyle = {
        width: '200px',
    };
    return (
        <div style={cssStyle}>
            <Radio value="1">
                Experts say the abandonment of book reading may have some unappealing consequences for cognition.
                “People are clearly reading fewer books now than they used to, and that has to have a cost because we
                know book reading is very good cognitive exercise,” says Ken Pugh, director of research at the
                Yale-affiliated Haskins Laboratories, which examines the importance of spoken and written language.
            </Radio>
        </div>
    );
});

stories.add('radio with extra', () => {
    return (
        <>
            <Radio value="1" extra="这是辅助的文本，同厂辅助文本会更长一些，甚至还可能换行">
                示例文本
            </Radio>
            <Radio style={{ width: 200 }} value="1" extra="这是辅助的文本，同厂辅助文本会更长一些，甚至还可能换行">
                示例文本
            </Radio>
        </>
    );
});
stories.add('radio checked', () => {
    return (
        <div>
            {'受控的checked = true'}
            <Radio value="1" checked>
                111
            </Radio>
            <br />
            {'受控的checked = false'}
            <Radio value="1" checked={false}>
                111
            </Radio>
            <br />
            {'不受控的defaultChecked = true'}
            <Radio value="1" defaultChecked={true}>
                111
            </Radio>
            <br />
            {'不受控的defaultChecked = false'}
            <Radio value="1" defaultChecked={false}>
                111
            </Radio>
        </div>
    );
});

stories.add('radio disabled', () => {
    return (
        <div>
            <Radio value="1" checked disabled>
                111
            </Radio>
            <Radio value="1" disabled>
                111
            </Radio>
        </div>
    );
});

class RadioControl extends React.Component {
    state = {
        checked: true,
        disabled: false,
    };

    toggleChecked = () => {
        this.setState({ checked: !this.state.checked });
    };

    toggleDisable = () => {
        this.setState({ disabled: !this.state.disabled });
    };

    onChange = e => {
        console.log('checked = ', e.target.checked);
        this.setState({
            checked: e.target.checked,
        });
    };

    render() {
        const label = `${this.state.checked ? 'Checked' : 'Unchecked'}-${this.state.disabled ? 'Disabled' : 'Enabled'}`;
        return (
            <div>
                <p style={{ marginBottom: '20px' }}>
                    <Radio checked={this.state.checked} disabled={this.state.disabled} onChange={this.onChange}>
                        {label}
                    </Radio>
                </p>
                <p>
                    <Button type="primary" size="small" onClick={this.toggleChecked}>
                        {!this.state.checked ? 'Check' : 'Uncheck'}
                    </Button>
                    <Button style={{ marginLeft: '10px' }} type="primary" size="small" onClick={this.toggleDisable}>
                        {!this.state.disabled ? 'Disable' : 'Enable'}
                    </Button>
                </p>
            </div>
        );
    }
}

stories.add('Radio controlled disabled & checked', () => <RadioControl />);

const RadioGroup1 = () => {
    const [state, setChecked] = useState('1');
    console.log(state);

    return (
        <div>
            <Radio.Group
                value={state}
                onChange={evt => {
                    setChecked(evt.target.value);
                }}
            >
                <Radio value="1" grouped>
                    1
                </Radio>
                <Radio value="2" grouped>
                    2
                </Radio>
            </Radio.Group>
            点击触发state变化，state变化触发展示变化
            <Radio.Group
                value={state}
                onChange={evt => {
                    setChecked(evt.target.value);
                }}
            >
                <Radio value="2" grouped>
                    2
                </Radio>
                <Radio value="1" grouped>
                    1
                </Radio>
            </Radio.Group>
        </div>
    );
};
class RadioWithControled extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: false,
        };
    }

    onChange(value) {
        this.setState({
            value: value.target.value,
        });
    }

    render() {
        return (
            <RadioGroup name="apple" value={this.state.value} onChange={this.onChange.bind(this)}>
                <Radio value={true}>111</Radio>
                <Radio value={false}>222</Radio>
            </RadioGroup>
        );
    }
}
stories.add('radio group', () => {
    let onChange = data => {
        console.log('change', data);
    };

    return (
        <div>
            value=1
            <RadioGroup name="pie" value="1" onChange={onChange}>
                <Radio value="1">111</Radio>
                <Radio value="2">222</Radio>
            </RadioGroup>
            <br />
            defaultValue=1
            <RadioGroup name="pie" defaultValue="1" onChange={onChange}>
                <Radio value="1">111</Radio>
                <Radio value="2">222</Radio>
            </RadioGroup>
            <br />
            value+onchange
            <RadioWithControled />
            <br />
            联动
            <RadioGroup1 />
        </div>
    );
});

stories.add('radio with vertical', () => {
    return (
        <Radio.Group>
            <Radio value="A" displayMode="vertical">
                无限长的一串字The Storybook webapp UI can be customised with this addon. It can be used to change the
                header, show/hide various UI elements and to enable full-screen mode by default.
            </Radio>
            <Radio value="C" displayMode="vertical">
                C
            </Radio>
            <Radio value="D" displayMode="vertical">
                D
            </Radio>
            <Radio value="E" displayMode="vertical">
                E
            </Radio>
        </Radio.Group>
    );
});

stories.add('radio group with options', () => {
    const plainOptions = ['Apple', 'Pear', 'Orange'];
    const options = [
        { label: 'Apple', value: 'Apple' },
        { label: 'Pear', value: 'Pear' },
        { label: 'Orange', value: 'Orange', disabled: true },
    ];
    const optionsWithDisabled = [
        { label: 'Apple', value: 'Apple' },
        { label: 'Pear', value: 'Pear' },
        { label: 'Orange', value: 'Orange', disabled: false },
    ];

    function onChange(event) {
        console.log(event);
    }

    return (
        <div>
            <RadioGroup name="apple" options={plainOptions} onChange={onChange} />
            <RadioGroup name="apple" options={options} onChange={onChange} />
            <RadioGroup name="apple" disabled options={optionsWithDisabled} onChange={onChange} />
        </div>
    );
});

const RadioWithAdvancedMode = () => {
    const [state, setChecked] = useState([true]);

    return (
        <div>
            <Radio
                checked={state}
                mode="advanced"
                onChange={e => {
                    console.log(e);
                    setChecked(e.target.checked);
                }}
            >
                111
            </Radio>
        </div>
    );
};
stories.add('radio with advanced mode', () => <RadioWithAdvancedMode />);

stories.add('radio group with advanced mode', () => {
    function onChange(evt) {
        console.log(evt);
    }

    return (
        <>
            <RadioGroup mode="advanced" onChange={onChange}>
                <Radio value="1">111</Radio>
                <Radio value="2">222</Radio>
                <Radio value="3">333</Radio>
            </RadioGroup>
            <br />
            <br />
            <RadioGroup mode="advanced" onChange={onChange} direction='horizontal'>
                <div className='block-radio-wrapper'>
                    <Radio value="1">111</Radio>
                </div>
                <div className='block-radio-wrapper'>
                    <Radio value="2">222</Radio>
                </div>
                <div className='block-radio-wrapper'>
                    <Radio value="3">333</Radio>
                </div>
            </RadioGroup>
        </>
    );
});

stories.add('radio + grid', () => {
    return (
        <Radio.Group style={{ width: '100%' }}>
            <Row>
                <Col span={8}>
                    <Radio value="A">
                        无限长的一串字The Storybook webapp UI can be customised with this addon. It can be used to
                        change the header, show/hide various UI elements and to enable full-screen mode by default.
                    </Radio>
                </Col>
                <Col span={8}>
                    <Radio value="B">B</Radio>
                </Col>
                <Col span={8}>
                    <Radio value="C">C</Radio>
                </Col>
                <Col span={8}>
                    <Radio value="D">D</Radio>
                </Col>
                <Col span={8}>
                    <Radio value="E">E</Radio>
                </Col>
            </Row>
        </Radio.Group>
    );
});

stories.add(`dynamic radioGroup`, () => {
    const Demo = () => {
        const [value, setValue] = useState(1);
        const onChange = e => {
            console.log('radio checked', e.target.value);

            setValue(e.target.value);
        };
        return (
            <RadioGroup onChange={onChange} value={value}>
                {value !== 4 ? <Radio value={1}>A</Radio> : null}
                <Radio value={2}>B</Radio>
                <Radio value={3}>C</Radio>
                <Radio value={4}>D</Radio>
            </RadioGroup>
        );
    };

    return <Demo />;
});

stories.add(`radioGroup button style`, () => {
    const Demo = () => {
        const [value1, setValue1] = useState(1);
        const [value2, setValue2] = useState(2);
        const [value3, setValue3] = useState(3);
        const onChange1 = e => {
            setValue1(e.target.value);
        };
        const onChange2 = e => {
            setValue2(e.target.value);
        };
        const onChange3 = e => {
            setValue3(e.target.value);
        };
        return (
            <Space vertical spacing='loose' align='start'>
                <RadioGroup type='button' buttonSize='small' onChange={onChange1} value={value1}>
                    <Radio value={1}>tiktok</Radio>
                    <Radio value={2}>pipixia</Radio>
                    <Radio value={3}>hotsoon</Radio>
                    <Radio value={4}>toutiao</Radio>
                </RadioGroup>
                <RadioGroup type='button' buttonSize='middle' onChange={onChange2} value={value2}>
                    <Radio value={1}>tiktok</Radio>
                    <Radio value={2}>pipixia</Radio>
                    <Radio value={3}>hotsoon</Radio>
                    <Radio value={4}>toutiao</Radio>
                </RadioGroup>
                <RadioGroup type='button' buttonSize='large' onChange={onChange3} value={value3}>
                    <Radio value={1}>tiktok</Radio>
                    <Radio value={2}>pipixia</Radio>
                    <Radio value={3}>hotsoon</Radio>
                    <Radio value={4}>toutiao</Radio>
                </RadioGroup>
            </Space>
        );
    };

    return <Demo />;
});

stories.add(`radioGroup card style`, () => (
    <>
        <div>常见情况</div>
        <RadioGroup type='card' defaultValue={1}>
            <Radio value={1} extra='Semi Design' style={{ width: 280 }}>
                多选框标题
            </Radio>
            <Radio value={2} extra='Semi Design' style={{ width: 280 }}>
                多选框标题
            </Radio>
            <Radio value={3} extra='Semi Design' style={{ width: 280 }}>
                多选框标题
            </Radio>
        </RadioGroup>
        <br />
        <br />
        <div>radio disabled</div>
        <RadioGroup type='card' defaultValue={1}>
            <Radio value={1} disabled extra='Semi Design' style={{ width: 280 }}>
                多选框标题
            </Radio>
            <Radio value={2} extra='Semi Design' style={{ width: 280 }}>
                多选框标题
            </Radio>
            <Radio value={3} extra='Semi Design' style={{ width: 280 }}>
                多选框标题
            </Radio>
        </RadioGroup>
        <br />
        <br />
        <div>radioGroup disabled</div>
        <RadioGroup type='card' disabled defaultValue={1}>
            <Radio value={1} extra='Semi Design' style={{ width: 280 }}>
                多选框标题
            </Radio>
            <Radio value={2} extra='Semi Design' style={{ width: 280 }}>
                多选框标题
            </Radio>
            <Radio value={3} extra='Semi Design' style={{ width: 280 }}>
                多选框标题
            </Radio>
        </RadioGroup>
        <br />
        <br />
        <div>文字很长，并且没有设置宽度，因此换行显示</div>
        <RadioGroup type='card' defaultValue={1}>
            <Radio value={1} extra='Semi Design 是由互娱社区前端团队与 UED 团队共同设计开发并维护的设计系统'>
                多选框标题
            </Radio>
            <Radio value={2} extra='Semi Design 是由互娱社区前端团队与 UED 团队共同设计开发并维护的设计系统'>
                多选框标题
            </Radio>
            <Radio value={3} extra='Semi Design 是由互娱社区前端团队与 UED 团队共同设计开发并维护的设计系统'>
                多选框标题
            </Radio>
        </RadioGroup>
        <br />
        <br />
        <div>设置了width=180</div>
        <RadioGroup type='card' defaultValue={1}>
            <Radio value={1} extra='Semi Design 是由互娱社区前端团队与 UED 团队共同设计开发并维护的设计系统' style={{ width: 180 }}>
                多选框标题
            </Radio>
            <Radio value={2} extra='Semi Design 是由互娱社区前端团队与 UED 团队共同设计开发并维护的设计系统' style={{ width: 180 }}>
                多选框标题
            </Radio>
            <Radio value={3} extra='Semi Design 是由互娱社区前端团队与 UED 团队共同设计开发并维护的设计系统' style={{ width: 180 }}>
                多选框标题
            </Radio>
        </RadioGroup>
        <br />
        <br />
        <div>没有extra，width=180</div>
        <RadioGroup type='card' defaultValue={1}>
            <Radio value={1} style={{ width: 180 }}>
                多选框标题
            </Radio>
            <Radio value={2} style={{ width: 180 }}>
                多选框标题
            </Radio>
            <Radio value={3} style={{ width: 180 }}>
                多选框标题
            </Radio>
        </RadioGroup>
        <br />
        <br />
        <div>没有标题，width=380</div>
        <RadioGroup type='card' defaultValue={1}>
            <Radio value={1} extra='Semi Design 是由互娱社区前端团队与 UED 团队共同设计开发并维护的设计系统' style={{ width: 380 }}>
            </Radio>
            <Radio value={2} extra='Semi Design 是由互娱社区前端团队与 UED 团队共同设计开发并维护的设计系统' style={{ width: 380 }}>
            </Radio>
            <Radio value={3} extra='Semi Design 是由互娱社区前端团队与 UED 团队共同设计开发并维护的设计系统' style={{ width: 380 }}>
            </Radio>
        </RadioGroup>
        <br />
        <br />
        <hr />
        <div>下面是垂直的情况：</div>
        <div>常见情况</div>
        <RadioGroup direction='vertical' type='card' defaultValue={1}>
            <Radio value={1} extra='Semi Design' style={{ width: 280 }}>
                多选框标题
            </Radio>
            <Radio value={2} extra='Semi Design' style={{ width: 280 }}>
                多选框标题
            </Radio>
            <Radio value={3} extra='Semi Design' style={{ width: 280 }}>
                多选框标题
            </Radio>
        </RadioGroup>
        <br />
        <br />
        <div>没有设置宽度</div>
        <RadioGroup direction='vertical' type='card' defaultValue={1}>
            <Radio value={1} extra='Semi Design 是由互娱社区前端团队与 UED 团队共同设计开发并维护的设计系统'>
                多选框标题
            </Radio>
            <Radio value={2} extra='Semi Design 是由互娱社区前端团队与 UED 团队共同设计开发并维护的设计系统'>
                多选框标题
            </Radio>
            <Radio value={3} extra='Semi Design 是由互娱社区前端团队与 UED 团队共同设计开发并维护的设计系统'>
                多选框标题
            </Radio>
        </RadioGroup>
        <br />
        <br />
        <div>设置了width=380</div>
        <RadioGroup direction='vertical' type='card' defaultValue={1}>
            <Radio value={1} extra='Semi Design 是由互娱社区前端团队与 UED 团队共同设计开发并维护的设计系统' style={{ width: 380 }}>
                多选框标题
            </Radio>
            <Radio value={2} extra='Semi Design 是由互娱社区前端团队与 UED 团队共同设计开发并维护的设计系统' style={{ width: 380 }}>
                多选框标题
            </Radio>
            <Radio value={3} extra='Semi Design 是由互娱社区前端团队与 UED 团队共同设计开发并维护的设计系统' style={{ width: 380 }}>
                多选框标题
            </Radio>
        </RadioGroup>
    </>
));

stories.add(`radioGroup pureCard style`, () => (
    <>
        <div>常见情况</div>
        <RadioGroup type='pureCard' defaultValue={1}>
            <Radio value={1} extra='Semi Design' style={{ width: 280 }}>
                多选框标题
            </Radio>
            <Radio value={2} extra='Semi Design' style={{ width: 280 }}>
                多选框标题
            </Radio>
            <Radio value={3} extra='Semi Design' style={{ width: 280 }}>
                多选框标题
            </Radio>
        </RadioGroup>
        <br />
        <br />
        <div>radio disabled</div>
        <RadioGroup type='pureCard' defaultValue={1}>
            <Radio value={1} disabled extra='Semi Design' style={{ width: 280 }}>
                多选框标题
            </Radio>
            <Radio value={2} extra='Semi Design' style={{ width: 280 }}>
                多选框标题
            </Radio>
            <Radio value={3} extra='Semi Design' style={{ width: 280 }}>
                多选框标题
            </Radio>
        </RadioGroup>
        <br />
        <br />
        <div>radioGroup disabled</div>
        <RadioGroup type='pureCard' disabled defaultValue={1}>
            <Radio value={1} extra='Semi Design' style={{ width: 280 }}>
                多选框标题
            </Radio>
            <Radio value={2} extra='Semi Design' style={{ width: 280 }}>
                多选框标题
            </Radio>
            <Radio value={3} extra='Semi Design' style={{ width: 280 }}>
                多选框标题
            </Radio>
        </RadioGroup>
        <br />
        <br />
        <div>文字很长，并且没有设置宽度，因此换行显示</div>
        <RadioGroup type='pureCard' defaultValue={1}>
            <Radio value={1} extra='Semi Design 是由互娱社区前端团队与 UED 团队共同设计开发并维护的设计系统'>
                多选框标题
            </Radio>
            <Radio value={2} extra='Semi Design 是由互娱社区前端团队与 UED 团队共同设计开发并维护的设计系统'>
                多选框标题
            </Radio>
            <Radio value={3} extra='Semi Design 是由互娱社区前端团队与 UED 团队共同设计开发并维护的设计系统'>
                多选框标题
            </Radio>
        </RadioGroup>
        <br />
        <br />
        <div>设置了width=180</div>
        <RadioGroup type='pureCard' defaultValue={1}>
            <Radio value={1} extra='Semi Design 是由互娱社区前端团队与 UED 团队共同设计开发并维护的设计系统' style={{ width: 180 }}>
                多选框标题
            </Radio>
            <Radio value={2} extra='Semi Design 是由互娱社区前端团队与 UED 团队共同设计开发并维护的设计系统' style={{ width: 180 }}>
                多选框标题
            </Radio>
            <Radio value={3} extra='Semi Design 是由互娱社区前端团队与 UED 团队共同设计开发并维护的设计系统' style={{ width: 180 }}>
                多选框标题
            </Radio>
        </RadioGroup>
        <br />
        <br />
        <div>没有extra，width=180</div>
        <RadioGroup type='pureCard' defaultValue={1}>
            <Radio value={1} style={{ width: 180 }}>
                多选框标题
            </Radio>
            <Radio value={2} style={{ width: 180 }}>
                多选框标题
            </Radio>
            <Radio value={3} style={{ width: 180 }}>
                多选框标题
            </Radio>
        </RadioGroup>
        <br />
        <br />
        <div>没有标题，width=380</div>
        <RadioGroup type='pureCard' defaultValue={1}>
            <Radio value={1} extra='Semi Design 是由互娱社区前端团队与 UED 团队共同设计开发并维护的设计系统' style={{ width: 380 }}>
            </Radio>
            <Radio value={2} extra='Semi Design 是由互娱社区前端团队与 UED 团队共同设计开发并维护的设计系统' style={{ width: 380 }}>
            </Radio>
            <Radio value={3} extra='Semi Design 是由互娱社区前端团队与 UED 团队共同设计开发并维护的设计系统' style={{ width: 380 }}>
            </Radio>
        </RadioGroup>
        <br />
        <br />
        <hr />
        <div>下面是垂直的情况：</div>
        <div>常见情况</div>
        <RadioGroup direction='vertical' type='pureCard' defaultValue={1}>
            <Radio value={1} extra='Semi Design' style={{ width: 280 }}>
                多选框标题
            </Radio>
            <Radio value={2} extra='Semi Design' style={{ width: 280 }}>
                多选框标题
            </Radio>
            <Radio value={3} extra='Semi Design' style={{ width: 280 }}>
                多选框标题
            </Radio>
        </RadioGroup>
        <br />
        <br />
        <div>没有设置宽度</div>
        <RadioGroup direction='vertical' type='pureCard' defaultValue={1}>
            <Radio value={1} extra='Semi Design 是由互娱社区前端团队与 UED 团队共同设计开发并维护的设计系统'>
                多选框标题
            </Radio>
            <Radio value={2} extra='Semi Design 是由互娱社区前端团队与 UED 团队共同设计开发并维护的设计系统'>
                多选框标题
            </Radio>
            <Radio value={3} extra='Semi Design 是由互娱社区前端团队与 UED 团队共同设计开发并维护的设计系统'>
                多选框标题
            </Radio>
        </RadioGroup>
        <br />
        <br />
        <div>设置了width=380</div>
        <RadioGroup direction='vertical' type='pureCard' defaultValue={1}>
            <Radio value={1} extra='Semi Design 是由互娱社区前端团队与 UED 团队共同设计开发并维护的设计系统' style={{ width: 380 }}>
                多选框标题
            </Radio>
            <Radio value={2} extra='Semi Design 是由互娱社区前端团队与 UED 团队共同设计开发并维护的设计系统' style={{ width: 380 }}>
                多选框标题
            </Radio>
            <Radio value={3} extra='Semi Design 是由互娱社区前端团队与 UED 团队共同设计开发并维护的设计系统' style={{ width: 380 }}>
                多选框标题
            </Radio>
        </RadioGroup>
    </>
));