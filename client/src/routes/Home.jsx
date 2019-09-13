import React from 'react'
import { Formik, Field } from 'formik'
import { InputField } from './../components/InputField/index';
import { connect } from 'react-redux';
import { fetchPackage } from './../actions/npmActions';
import GraphVisualize from '../components/GraphVisualize';

class Home extends React.Component {
    renderDependencies = (list) => {
        if (list === undefined) {
            return 'No dependencies found';
        }
        return (
            Object.keys(list).map((key) => {
                return <li key={key + list[key]}>{key}: {list[key]}</li>
            })
        )
    }

    render() {
        const { currentPackage } = this.props;
        
        return (
            <>
                <section className="wrapper">
                    <div className="sidebar">
                        <h1 className="sidebar__title">Analyze NPM dependencies</h1>
                        <Formik
                            initialValues={{
                                package: ''
                            }}
                            onSubmit={ async (values, { setSubmitting, setErrors }) => {
                                const { success } = await this.props.fetchPackage(values.package);
                                if (!success) {
                                    setErrors({
                                        package: `NPM package "${values.package}" was not found`
                                    })
                                }
                                setSubmitting(false);
                            }}
                        >
                            {({
                                handleSubmit,
                                isSubmitting,
                            }) => (
                                    <form onSubmit={handleSubmit}>
                                        <Field
                                            component={InputField}
                                            type="text"
                                            name="package"
                                            required
                                    />
                                    <button className="button" type="submit" disabled={isSubmitting}>
                                        Submit
                                    </button>
                                </form>
                            )}
                        </Formik>
                        <div className="dependencies">
                            <h3 className="dependencies__title">Current package: {currentPackage.name}</h3>
                            <ol className="dependencies__list">
                                {this.renderDependencies(currentPackage.dependencies)}
                            </ol>
                        </div>
                    </div>
                    <div className="graph">
                        <GraphVisualize currentPackage={currentPackage} />
                    </div>
                </section>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        packages: state.npm.packages,
        currentPackage: state.npm.currentPackage
    };
}

export default connect(mapStateToProps, { fetchPackage })(Home)