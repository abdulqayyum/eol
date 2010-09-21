require File.dirname(__FILE__) + '/../spec_helper'

def find_or_gen(name)
  AgentRole.find_by_label(name) || AgentRole.gen(:label => name)
end

describe Attributions do

  # Please note that this gets run before each describe block... not just once!
  before(:all) do
    load_foundation_cache
    # This order is hard-coded in AgentRole, and needs to be the same here (and in the next block):
    @author = find_or_gen('Author')
    @source = find_or_gen('Source')
    @unused = find_or_gen('Project')
    @last   = find_or_gen('Publisher')

    # This array MUST be in reverse order, because I am...
    @fake_ados    = [AgentsDataObject.gen(:agent_role => @last),
                     AgentsDataObject.gen(:agent_role => @source, :view_order => 2),
                     AgentsDataObject.gen(:agent_role => @source, :view_order => 1),
                     AgentsDataObject.gen(:agent_role => @author)]
    @return_order = @fake_ados.reverse # ...cheating to make sure the result is the reverse of that.

    @data_type = DataType.gen

  end

  describe 'initialization' do

    it 'should raise an error without a list of ADOs' do
      lambda { Attributions.new(nil) }.should raise_error /ado/i
    end

    it 'should raise an error if list of ADOs contains non-ADOs' do
      lambda { Attributions.new([{:hashes => 'will not work'}]) }.should raise_error /ado/i
    end

    it 'should use its data_types\'s full attribution order' do
      Attributions.new(@fake_ados)
    end

    it 'should sort by attribution order, then view order (also, with no nils)' do
      # Okay, this sucks... but I use map() to get the raw array, not the Attributions class:
      Attributions.new(@fake_ados).map {|f| f}.should == @return_order
    end

  end

  describe 'add_* methods' do

    before(:each) do
      @attributions = Attributions.new(@fake_ados)
    end

    it 'should do nothing if supplier is nil' do
      @attributions.add_supplier(nil)
      @attributions.should == @attributions
    end

    it 'should insert supplier after the Author' do
      @supplier = Agent.gen
      @attributions.add_supplier(@supplier)
      @attributions.map {|a| a.agent_role.label }.should include('Supplier')
    end

    it 'should do nothing if there is no license and no rights_statement' do
      @attributions.add_license(nil)
      @attributions.should == @attributions
    end

    it 'should insert the license after the author, if both source and author exist' do
      # Source and Author both exist in our current example.
      @license = License.gen(:description => 'oh say can you see')
      @attributions.add_license(@license)
      ado = @attributions.detect {|attr| attr.agent.project_name == @license.description }
      ado.should_not be_nil # It didn't get added at all, if this fails.
      ado.agent_role.label.should == 'License'
    end

    it 'should insert the license after the source, if no author exists' do
      attributions = Attributions.new(@fake_ados.delete_if {|ado| ado.agent_role == @author})
      @license = License.gen(:description => 'bombs bursting in air')
      attributions.add_license(@license)
      ado = attributions.detect {|attr| attr.agent.project_name == @license.description }
      ado.should_not be_nil # It didn't get added at all, if this fails.
      #attributions.should find_after_agent_role(ado.agent, @source)
    end

    # it 'should put the license first, if no author or source exists' do
    #   attributions = Attributions.new(@fake_ados.delete_if {|ado| [@author, @source].include? ado.agent_role})
    #   @license = License.gen(:description => 'our home and native land')
    #   attributions.add_license(@license)
    #   pp attributions
    #   attributions[0].agent.project_name.should == @license.description
    # end

    it 'should add location to the end of the array' do
      location = 'here there, and everywhere'
      @attributions.add_location(location)
      @attributions.last.agent.project_name.should == location
      @attributions.last.agent_role.label.should == 'Location'
    end

    it 'should do nothing if there is no Source URL' do
      @attributions.add_source_url('')
      @attributions.should == @attributions
    end

    it 'should add Source URL to the end of the array' do
      source_url = 'here there, and everywhere'
      @attributions.add_source_url(source_url)
      @attributions.last.agent.project_name.should =~ /view\s+original/i
      @attributions.last.agent.homepage.should == source_url
      @attributions.last.agent_role.label.should == 'Source URL'
    end

    it 'should do nothing if there is no Citation' do
      @attributions.add_citation('')
      @attributions.should == @attributions
    end

    it 'should add Citation to the end of the array' do
      citation = 'here there, and everywhere'
      @attributions.add_citation(citation)
      @attributions.last.agent.project_name.should == citation
      @attributions.last.agent_role.label.should == 'Citation'
    end

  end

end
